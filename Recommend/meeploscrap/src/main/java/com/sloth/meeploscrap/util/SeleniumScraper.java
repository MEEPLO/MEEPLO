package com.sloth.meeploscrap.util;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.PageLoadStrategy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Getter
public class SeleniumScraper implements Scraper{
    private static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    private static final String WEB_DRIVER_PATH = "C:\\Users\\minah\\IdeaProjects\\S07P31A508\\Recommend\\meeploscrap\\src\\main\\resources\\chromedriver.exe";

    private static final String BASE_URL = "https://map.naver.com/v5/search/";

    private static final String CLICKABLE_SUFFIX_TAG = " > div > a";

    private WebDriver driver;
    private final String url;

    @Builder
    public SeleniumScraper(String location) {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();

        options.setPageLoadStrategy(PageLoadStrategy.NORMAL);

        options.addArguments("user-agent=Chrome/107.0.5304.88");
        options.addArguments("--enable-javascript");
        options.addArguments("headless");

        driver = new ChromeDriver(options);

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));

        this.url = BASE_URL + location + "/place";
    }

    public String focusInitFrame(){

        List<String> clickableList = initClickableMap().values().stream()
                .map(s -> DETAIL_DATA_CSS_SELECTOR + s + CLICKABLE_SUFFIX_TAG)
                .collect(Collectors.toList());

        try {
            driver.get(url);

            driver.switchTo().frame("entryIframe");

            clickableList.stream().map(c -> driver.findElements(By.cssSelector(c)))
                    .filter(elements -> !elements.isEmpty())
                    .forEach(e -> e.get(0).click());

            return driver.getPageSource();
        } catch(Exception e) {

            e.printStackTrace();

            return null;
        }
    }

    public void closeDriver() {
        driver.close();
    }

    private Map<String, String> initClickableMap() {
        return Map.ofEntries(
                Map.entry("explain", "li.SF_Mq.I5Ypx"),
                Map.entry("time", "li.SF_Mq.Sg7qM"));
    }

}
