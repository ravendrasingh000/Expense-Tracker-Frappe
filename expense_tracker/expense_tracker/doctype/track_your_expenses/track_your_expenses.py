# Copyright (c) 2025, Ravin and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class TrackYourExpenses(Document):
    def before_save(self):
        self.total_credit = 0
        self.total_debit = 0

        for row in self.data_mrga:
            if row.credit_debit == "Credit":
                self.total_credit += row.amount
            elif row.credit_debit == "Debit":
                self.total_debit += row.amount

        self.saving_amount = self.total_credit - self.total_debit