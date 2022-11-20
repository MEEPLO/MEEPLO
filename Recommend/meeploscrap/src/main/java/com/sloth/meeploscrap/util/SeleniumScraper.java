package com.sloth.meeploscrap.util;

import com.sloth.meeploscrap.location.entity.type.LocationType;
import com.sloth.meeploscrap.util.type.LocationInfoSelector;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Getter
public class SeleniumScraper implements Scraper{
    private final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    private final String WEB_DRIVER_PATH = "C:\\Users\\SSAFY\\IdeaProjects\\S07P31A508\\Recommend\\meeploscrap\\src\\main\\resources\\static\\chromedriver.exe";

    private final String BASE_URL = "https://map.naver.com/v5/search/";

    private final String CLICKABLE_SUFFIX_TAG = " > div > a";

    private final String TABS_CLASS = ".tpj9w";

    private final WebDriver driver;

    @Builder
    public SeleniumScraper() {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();

        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);

        options.addArguments("user-agent=Chrome/107.0.5304.88");
        options.addArguments("--enable-javascript");
        options.addArguments("--headless");

        options.addArguments("disable-gpu");

        driver = new ChromeDriver(options);

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
    }

    public String focusInitFrame(String location){

        List<String> clickableList = initClickableMap().values().stream()
                .map(s -> DETAIL_DATA_CSS_SELECTOR + s + CLICKABLE_SUFFIX_TAG)
                .collect(Collectors.toList());


            driver.get(BASE_URL + location + "/place");

            try {
                driver.switchTo().frame("entryIframe");

            } catch(NoSuchFrameException e) {

                try {
                    driver.switchTo().frame("searchIframe");
                } catch (Exception e2) {
                    return LocationType.OTHER_ERR.name();
                }

                try {
                    if ((long) driver.findElements(By.className("FYvSc")).size() > 0)
                        return LocationType.NO_FRAME.name();
                } catch (Exception e3) {
                    return LocationType.OTHER_ERR.name();
                }

                return LocationType.SEARCH_FRAME.name();
            }

            try {
                clickableList.stream().map(c -> driver.findElements(By.cssSelector(c)))
                        .filter(elements -> !elements.isEmpty())
                        .forEach(e -> e.get(0).click());
            } catch (Exception e) {
                return LocationType.NOT_CLICKABLE.name();
            }

            return driver.getPageSource();

    }

    public String getDetailExplain() {
        return driver.findElements(By.cssSelector(LocationInfoSelector.DETAIL_DESCRIPTION.getSelector())).stream()
                .findFirst()
                .map(e -> e.getText().replaceAll("내용 더보기", ""))
                .orElse("");
    }

    public String clickBar(String elementText) {
        try {
            driver.findElements(By.cssSelector((TABS_CLASS))).stream()
                    .filter(e -> elementText.equals(e.getText()))
                    .forEach(WebElement::click);

            // 왜 이걸 찍어야 Jsoup에서 값을 가져올 수 있는걸까
            log.info(driver.findElements(By.cssSelector(".cbqXB")).stream()
                        .map(WebElement::getText)
                        .collect(Collectors.toList()).toString());

            return driver.getPageSource();

        } catch (Exception e) {
            log.error("error : {}", e.getMessage());
            return LocationType.NOT_CLICKABLE.name();
        }
    }

    public void closeDriver() {
        driver.quit();
    }

    private Map<String, String> initClickableMap() {
        return Map.ofEntries(
                Map.entry("explain", "li.SF_Mq.I5Ypx"),
                Map.entry("time", "li.SF_Mq.Sg7qM"));
    }

}
