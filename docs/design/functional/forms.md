# Forms

## Contact form

The contact form lets visitors contact the portfolio author. A successful submission notifies both the author and the visitor; the visitor's notification contains all submitted data.

| Name | Purpose | Type | Required | Error condition |
| --- | --- | --- | --- | --- |
| Name | Visitor's name | Text | Yes | Field is empty |
| Inquiry type | Kind of inquiry or project | Dropdown | Yes | No value selected |
| Email address | Visitor's email address | Email | Yes | Field is empty |
| Explanation | Explanation of the project or inquiry | Text area | No | Not applicable |

### Submission

- Fields cannot be edited and the form cannot be resubmitted while submission is in progress.
- Success replaces the form with a success message.
- Failure shows field states and retains entered data for correction and retry.

### Validation

Validation occurs when visitors leave a field or submit.

- Field errors appear beside the relevant field.
- Focus does not automatically prefer an invalid field.
- Server-side failures appear above the form.

### Privacy and abuse prevention

The name and email address are personal data, so consent is required. Submissions are retained for 30 days and then deleted. Spam must be prevented; detected spam produces an error above the form.

[Back to functional design](README.md)
