package com.qterminals.qbill.rest;

import com.qterminals.qbill.config.JWTConfig;
import com.qterminals.qbill.entities.BillTaxTypes;
import com.qterminals.qbill.generic.CrudEndpoint;
import com.qterminals.qbill.generic.CrudService;
import com.qterminals.qbill.service.BillTaxTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/bills")
public class BillEndpoint extends CrudEndpoint<BillTaxTypes, Long> {
    private final BillTaxTypesService billTaxTypesService;
    private final JWTConfig jwtConfig;

    public BillEndpoint(@Autowired BillTaxTypesService billTaxTypesService, @Autowired JWTConfig jwtConfig) {
        this.billTaxTypesService = billTaxTypesService;
        this.jwtConfig = jwtConfig;
    }

    @Override
    @PostMapping
    public ResponseEntity save(@Valid @RequestBody BillTaxTypes billTaxTypes) {
        System.out.println(billTaxTypes);
        var billSaved = this.getService().saveOrUpdate(billTaxTypes);
        return ResponseEntity.status(HttpStatus.CREATED).body(billSaved);
    }


    @Override
    @GetMapping(path = "/{genericKey}")
    public Optional<BillTaxTypes> get(@PathVariable Long genericKey) {
        return this.billTaxTypesService.findBillByGenericId(genericKey);
    }

    @Override
    protected CrudService<BillTaxTypes, Long> getService() {
        return this.billTaxTypesService;
    }
}
