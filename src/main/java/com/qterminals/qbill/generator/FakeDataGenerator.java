package com.qterminals.qbill.generator;

import com.github.javafaker.Faker;
import com.qterminals.qbill.entities.BillTaxTypes;
import com.qterminals.qbill.entities.Users;
import com.qterminals.qbill.entities.constant.UserStatus;
import com.qterminals.qbill.service.BillTaxTypesService;
import com.qterminals.qbill.service.UserService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@Component
public class FakeDataGenerator {

    private final UserService userService;
    private final BillTaxTypesService billTaxTypesService;

    public FakeDataGenerator(UserService userService, BillTaxTypesService billTaxTypesService) {
        this.userService = userService;
        this.billTaxTypesService = billTaxTypesService;
    }

    public void generateUsers() {
        this.userService.list().stream().forEach(users -> {
            this.userService.delete(users.getUserId());
        });

        List<Users> users = new ArrayList<>();
        var nabbasiUser = new Users("nabbasi", "x", "y");
        nabbasiUser.setFirstName("نعمان");
        nabbasiUser.setLastName("علی");

        var faizanUser = new Users("adnan", "x", "y");
        faizanUser.setFirstName("عدنان");
        faizanUser.setLastName("علی");

        users.add(nabbasiUser);
        users.add(faizanUser);
        this.userService.saveOrUpdateAll(users);
    }

    public void generateDummyBills() {
        this.billTaxTypesService.list().stream().forEach(bills -> {
            this.billTaxTypesService.delete(bills.getGenericKey());
        });

        var billTaxTypes = new ArrayList<BillTaxTypes>();
        IntStream.range(0, 50).forEach( (number) -> {
            var faker = new Faker();
            var name = faker.name();
            var bill = new BillTaxTypes();

            bill.setId(UUID.randomUUID().toString());
            bill.setDescription(faker.book().publisher());
            bill.setCreator(name.firstName());
            bill.setCreated(LocalDateTime.now());
            bill.setChanger(name.lastName());
            bill.setChanged(LocalDateTime.now());
            bill.setGlCode(faker.code().asin());

            billTaxTypes.add(bill);
        });

        this.billTaxTypesService.saveOrUpdateAll(billTaxTypes);
    }
}
