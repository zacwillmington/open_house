class User {
    constructor({id, name, email, password_digest, admin, uid, phone}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordDigest = password_digest;
        this.admin = admin;
        this.uid = uid;
        this.phone = phone;
    }
}
