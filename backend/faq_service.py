import json


def load_faqs():
    with open("faq_data.json", "r", encoding="utf-8") as file:
        return json.load(file)


def find_faq_answer(user_question):
    faqs = load_faqs()

    user_question = user_question.lower()

    for faq in faqs:
        if faq["question"].lower() in user_question:
            return faq["answer"]

    return None