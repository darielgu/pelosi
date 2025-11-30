import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

load_dotenv()


def send_email(emails: list[str], body: str) -> None:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(os.getenv("SENDER_EMAIL"), os.getenv("APP_PASS"))  # type: ignore
        msg = MIMEMultipart()
        msg["From"] = os.getenv("SENDER_EMAIL")  # type: ignore
        msg["Subject"] = "Pelosi Trade Update"
        msg.attach(MIMEText(body, "plain"))
        for email in emails:
            server.sendmail(os.getenv("SENDER_EMAIL"), email, msg.as_string())  # type: ignore
            print("Email successfully sent to " + email)

        server.quit()
