package com.qterminals.qbill.service;

import com.qterminals.qbill.entities.BillTaxTypes;
import com.qterminals.qbill.generic.CrudService;
import com.qterminals.qbill.repos.BillTaxTypesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class BillTaxTypesService extends CrudService<BillTaxTypes, Long> {
    private BillTaxTypesRepo billTaxTypesRepo;

    @Autowired
    public BillTaxTypesService(BillTaxTypesRepo billTaxTypesRepo) {
        this.billTaxTypesRepo = billTaxTypesRepo;
    }

    public Optional<BillTaxTypes> findBillByGenericId(Long genericKey) {
        return this.billTaxTypesRepo.findByGenericKey(genericKey);
    }

    @Override
    protected JpaRepository<BillTaxTypes, Long> getRepository() {
        return billTaxTypesRepo;
    }
}
