from db.main import supa_client
from scraper.main import quiver_quant_scraper


def scraper_into_db():
    results = quiver_quant_scraper()
    for result in results:
        print("Inserting new trade into DB " + result["ticker"])
        exists = (
            supa_client.table("pelosi")
            .select("*")
            .eq("ticker", result["ticker"])
            .eq("company", result["company"])
            .eq("action", result["action"])
            .eq("amount", result["amount"])
            .eq("action_date", result["action_date"])
            .execute()
        )
        if len(exists.data) == 0:
            supa_client.table("pelosi").insert(
                {
                    "ticker": result["ticker"],
                    "company": result["company"],
                    "asset_type": result["asset_type"],
                    "action": result["action"],
                    "amount": result["amount"],
                    "action_date": result["action_date"],
                    "announce_date": result["announce_date"],
                    "created_at": "now()",
                }
            ).execute()
        else:
            print("Duplicate — skipping")


if __name__ == "__main__":
    scraper_into_db()
