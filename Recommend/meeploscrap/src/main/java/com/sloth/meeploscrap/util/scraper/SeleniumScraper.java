package com.sloth.meeploscrap.util.scraper;

import lombok.Builder;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

public class SeleniumScraper {
    public static final String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static final String WEB_DRIVER_PATH = "C:\\Users\\SSAFY\\IdeaProjects\\S07P31A508\\Recommend\\meeploscrap\\src\\main\\resources\\chromedriver.exe";

    private static final String BASE_URL = "https://map.naver.com/v5/search/";

    private WebDriver driver;
    private String url;

    @Builder
    public SeleniumScraper(String location) {
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("user-agent=Chrome/107.0.5304.88");
        options.addArguments("--enable-javascript");
        options.addArguments("headless");

        driver = new ChromeDriver(options);

/*        Duration duration = ;
        driver.manage().timeouts().implicitlyWait(duration);*/

        this.url = BASE_URL + location + "/place";
    }

    public String scrapWholeHTML(){
        try {
            driver.get(url);

            Thread.sleep(2000);

            driver.switchTo().frame("entryIframe");

            return driver.getPageSource();
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            driver.close();
        }
        return null;
    }

}
