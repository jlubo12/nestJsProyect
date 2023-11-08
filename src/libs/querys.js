'use strict';

module.exports = class Querys {
    static get getLastDeliveryNumber() {
        return `select deliveryNumber from batchTransfers 
                where nup = ? 
                order by deliveryNumber desc 
                limit 1`;
    };

    static get getNupByAccount() {
        return `select NUP from customers c 
                inner join coelsa c2 
                on c2.CUIT = c.Documento 
                inner join accounts a 
                on a.accountId = c2.AccountID 
                where a.Sucursal = ?
                AND a.Tipo = ?
                AND a.Cuenta = ?`
    }

    static get insertDeliveryNumber() {
        return `insert into batchTransfers 
                (nup, deliveryNumber, fileName) 
                values (?,?,?)`;
    }

    static get commonOtherBanks() {
        return `select CBU, CUIT from coelsa
                where Banco <> 'SANTANDER'
                AND Divisa = ?
                order by rand()
                limit ?`;
    }

    static get sameHolder() {
        return `select LPAD(Sucursal ,3,'0') as branch, LPAD(Tipo ,2,'0') as type, LPAD(Cuenta ,7,'0') as number, NAME
                from accounts a 
                inner join coelsa c 
                on a.accountId = c.AccountID 
                inner join customers c2 
                on c.CUIT = c2.Documento 
                where a.Divisa = ?
                AND c2.NUP = ?
                AND a.Cuenta <> ?
                limit ?`;
    }

    static get commonSantander() {
        return `select LPAD(Sucursal ,3,'0') as branch, LPAD(Tipo ,2,'0') as type, LPAD(Cuenta ,7,'0') as number, NAME
                from accounts a 
                inner join coelsa c 
                on a.accountId = c.AccountID 
                inner join customers c2 
                on c.CUIT = c2.Documento 
                where a.Divisa = ?
                AND a.Status = 1
                AND c2.NUP <> ?
                order by rand()
                limit ?`;
    }
}