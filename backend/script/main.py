from db.main import supa_client
from services.insertion import scraper_into_db_cron
from services.send import send_email


def run_job():
    emails = supa_client.from_("users").select("email").execute()
    new_trades = scraper_into_db_cron()
    email_template = "Hello,\n\nThe latest Pelosi trades have been scraped and inserted into the database. Here are the new trades:\n\n"
    if len(new_trades) <= 0:
        print("No new trades found.")
        return
    else:
        print(f"Inserted {len(new_trades)} new trades.")
        for trade in new_trades:
            email_template += f"- {trade['ticker']} | {trade['company']} | {trade['action']} | {trade['amount']} | {trade['action_date']}\n"
    email_template += "\nBest regards,\nPelosi Tracker Bot"
    print(email_template)

    recipients = []
    for mail in emails.data:
        recipients.append(mail["email"])  # type: ignore

    send_email(recipients, email_template)


if __name__ == "__main__":
    run_job()
