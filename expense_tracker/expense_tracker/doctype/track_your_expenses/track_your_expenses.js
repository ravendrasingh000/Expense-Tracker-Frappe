// Copyright (c) 2025, Ravin and contributors
// For license information, please see license.txt

frappe.ui.form.on('Track Your Expenses', {
    refresh(frm) {
        calculate_totals(frm);
    },
    table_rows_on_form_rendered(frm) {
        calculate_totals(frm);
    }
});

frappe.ui.form.on('Expense Entries', {
    credit_debit(frm, cdt, cdn) {
        calculate_totals(frm);
    },
    amount(frm, cdt, cdn) {
        calculate_totals(frm);
    }
});

function calculate_totals(frm) {
    let total_credit = 0;
    let total_debit = 0;

    frm.doc.table_rows.forEach(row => {
        if (row.credit_debit === 'Credit') {
            total_credit += row.amount || 0;
        } else if (row.credit_debit === 'Debit') {
            total_debit += row.amount || 0;
        }
    });

    frm.set_value('total_credit', total_credit);
    frm.set_value('total_debit', total_debit);
    frm.refresh_field('total_credit');
    frm.refresh_field('total_debit');
}

// ......................................................................
frappe.ui.form.on('Track Your Expenses', {
    refresh: function(frm) {
        // FILTER BUTTON
        frm.add_custom_button('Filter', () => {
            frappe.prompt([
                {
                    fieldname: 'category',
                    label: 'Select Category',
                    fieldtype: 'Select',
                    reqd: 1,
                    options: [
                        'Food & Dining',
                        'Transportation',
                        'Bills & Utilities',
                        'Groceries',
                        'Entertainment',
                        'Shopping',
                        'Health & Medical',
                        'Education',
                        'Travel',
                        'Rent',
                        'Insurance',
                        'Loan EMI',
                        'Investment',
                        'Mobile & Internet',
                        'Subscriptions',
                        'Fuel / Petrol',
                        'Personal Care',
                        'Donations',
                        'Gifts',
                        'Other'
                    ].join('\n')
                }
            ], function(values) {
                const selected_category = values.category;

                // Force re-render child table
                frm.fields_dict.table_rows.grid.refresh();

                // Allow DOM to fully update
                setTimeout(() => {
                    frm.fields_dict.table_rows.grid.grid_rows.forEach(row => {
                        if (row.doc.expense_category === selected_category) {
                            $(row.wrapper).show(); // ✅ Show matching rows
                        } else {
                            $(row.wrapper).hide(); // ❌ Hide non-matching rows
                        }
                    });
                }, 200);
            }, 'Filter by Category');
        });

        // RESET BUTTON
        frm.add_custom_button('Reset Filter', () => {
            frm.fields_dict.table_rows.grid.grid_rows.forEach(row => {
                $(row.wrapper).show(); // ✅ Show all rows
            });
        });
    }
});






