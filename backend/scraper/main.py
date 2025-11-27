import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


def start_driver():
    chrome_options = Options()  # instantiate a chrome options object
    chrome_options.add_argument("--headless")  # run in headless mode
    chrome_options.add_argument("--no-sandbox")  # bypass OS security model
    chrome_options.add_argument(
        "--disable-dev-shm-usage"
    )  # overcome limited resource problems
    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()), options=chrome_options
    )  # instantiate a chrome driver object
    return driver


def quiver_quant_scraper():
    driver = start_driver()
    driver.get(
        "https://www.quiverquant.com/congresstrading/politician/Nancy%20Pelosi-P000197"
    )
    time.sleep(3)

    rows = driver.find_elements(By.CSS_SELECTOR, "#tradeTable tbody tr")
    results = []

    for row in rows:
        tds = row.find_elements(By.TAG_NAME, "td")
        if len(tds) < 4:
            continue

        # ----- COLUMN 0: TICKER + COMPANY + ASSET TYPE -----
        img = tds[0].find_element(By.TAG_NAME, "img")
        ticker = img.get_attribute("alt").split()[0]  # type: ignore

        flex = tds[0].find_element(By.CSS_SELECTOR, ".flex-column")
        t0_lines = flex.text.split("\n")
        company = t0_lines[1]
        asset_type = t0_lines[2]

        # ----- COLUMN 1: TRANSACTION TYPE + AMOUNT -----
        action = tds[1].find_element(By.TAG_NAME, "strong").text.strip()
        price = tds[1].find_element(By.TAG_NAME, "span").text.strip()

        # ----- COLUMN 2: TRANSACTION DATE -----
        action_date = tds[2].text.strip()

        # ----- COLUMN 3: FILED DATE -----
        announce_date = tds[3].text.strip()

        results.append(
            {
                "ticker": ticker,
                "company": company,
                "asset_type": asset_type,
                "action": action,
                "amount": price,
                "action_date": action_date,
                "announce_date": announce_date,
            }
        )

    print(results)


if __name__ == "__main__":
    quiver_quant_scraper()
