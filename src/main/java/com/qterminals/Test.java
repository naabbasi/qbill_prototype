package com.qterminals;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Test {
    public static void main(String[] args) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        int month = calendar.get(Calendar.MONTH);
        System.out.println(month);

        System.out.println(new SimpleDateFormat("M").format(new Date()));
    }
}
