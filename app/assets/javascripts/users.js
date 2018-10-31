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

function createUser(data){
    user = new User;
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.passwordDigest = data.password_digest;
    user.admin = data.admin;
    user.uid = data.uid;
    user.phone = data.phone;
    return user;
}
