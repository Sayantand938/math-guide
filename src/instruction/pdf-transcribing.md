# Instruction Document for LLM: Transcribing Scanned Math PDFs

## **Objective**

Your task is to process a PDF containing **scanned images of math questions** and produce a **fully structured JSON output** following the specified schema. The JSON should preserve the hierarchy of questions, sub-questions, and their detailed solutions.

---

## **Input**

* **Format:** PDF file
* **Content:** Scanned math questions (algebraic, arithmetic, or formula-based problems)
* **Language:** English
* **Complexity:** May include fractions, exponents, products, sums, and algebraic identities.

---

## **Output**

* **Format:** JSON
* **Strict Schema:** Must follow this hierarchy:

```json
{
  "title": "string",               // Title of the document or exercise
  "chapter": "string",             // Chapter or topic
  "questions": [
    {
      "question_no": "string",     // Question number
      "content": "string",         // Question statement
      "sub_questions": [           // Array of sub-questions (if any)
        {
          "sub_question_no": "string", // Sub-question number (e.g., (i), (ii))
          "content": "string",         // Sub-question statement
          "solution": [                // Step-by-step solution
            "string"
          ]
        }
      ],
      "solution": [                  // For questions without sub-questions
        "string"
      ]
    }
  ]
}
```

**Notes:**

* If a question has **sub-questions**, place the solutions in the `sub_questions[].solution` array.
* If a question **does not have sub-questions**, place the solution in `solution` at the question level.
* Use **exact LaTeX syntax** for math expressions wherever applicable (`$...$`).
* Include **step-by-step reasoning** in the `solution` array. The final line should always contain the final answer in the format: `Answer: ...`.

---

## **Processing Steps**

1. **Extract Text from PDF**

   * Use OCR capable of detecting mathematical notation.
   * Ensure fractions, exponents, and algebraic formulas are captured accurately.

2. **Identify Structure**

   * Detect `title` and `chapter` from the header or first page.
   * Detect each question and sub-question:

     * Question numbers (1, 2, 3, …)
     * Sub-question numbers ((i), (ii), …)

3. **Parse Math Expressions**

   * Maintain LaTeX formatting for clarity.
   * Correctly interpret scanned symbols such as:

     * Exponents (`^`)
     * Fractions (`\frac{a}{b}`)
     * Products and sums
     * Parentheses

4. **Generate Step-by-Step Solutions**

   * For each question/sub-question, produce **clear reasoning steps**.
   * Always end with a line containing the final answer: `Answer: ...`

5. **Populate JSON**

   * Fill the JSON structure exactly as per the schema.
   * Ensure arrays are used correctly: `questions[]` and `sub_questions[]`.
   * Maintain the order of questions and sub-questions.

---

## **Quality Requirements**

* **Accuracy:** Ensure all numeric calculations and formula applications are correct.
* **Completeness:** No question should be skipped.
* **Format:** Output must be valid JSON (no trailing commas, correct brackets).
* **Consistency:** Keep numbering and notation consistent throughout the document.

---

## **Example Output**

```json
{
  "title": "Let's work out - 12.3",
  "chapter": "Chapter 12: ALGEBRAIC FORMULAE",
  "questions": [
    {
      "question_no": "1",
      "content": "Using the formula $a^2 - b^2 = (a + b)(a - b)$, let's find the values:",
      "sub_questions": [
        {
          "sub_question_no": "(i)",
          "content": "$(37)^2 - (13)^2$",
          "solution": [
            "Using the formula $a^2 - b^2 = (a + b)(a - b)$.",
            "Here, $a = 37$ and $b = 13$.",
            "So, $(37)^2 - (13)^2 = (37 + 13)(37 - 13)$.",
            "$= (50)(24)$.",
            "$= 1200$.",
            "Answer: 1200"
          ]
        }
      ]
    }
  ]
}
```

