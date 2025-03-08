package com.example.expensetracker;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private EditText editTextDescription, editTextAmount;
    private Button buttonAdd;
    private RecyclerView recyclerView;
    private ExpenseAdapter expenseAdapter;
    private DatabaseHelper databaseHelper;
    private ArrayList<Expense> expenseList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editTextDescription = findViewById(R.id.editTextDescription);
        editTextAmount = findViewById(R.id.editTextAmount);
        buttonAdd = findViewById(R.id.buttonAdd);
        recyclerView = findViewById(R.id.recyclerView);

        databaseHelper = new DatabaseHelper(this);
        expenseList = databaseHelper.getAllExpenses();

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        expenseAdapter = new ExpenseAdapter(expenseList);
        recyclerView.setAdapter(expenseAdapter);

        buttonAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String description = editTextDescription.getText().toString().trim();
                String amountStr = editTextAmount.getText().toString().trim();

                if (!description.isEmpty() && !amountStr.isEmpty()) {
                    double amount = Double.parseDouble(amountStr);
                    Expense expense = new Expense(description, amount);
                    databaseHelper.addExpense(expense);
                    expenseList.add(expense);
                    expenseAdapter.notifyDataSetChanged();
                } else {
                    Toast.makeText(MainActivity.this, "Please enter all fields", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
