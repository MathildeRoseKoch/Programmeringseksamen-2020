class User{
    constructor(email, password, name, interest, gender){
        this.email = email;
        this.password = password;
        this.name = name;
        this. interest = interest;
        this.gender = gender;
    }
};

class Match{
    constructor (last_m_id, match_id, last_m_name, match_name){
        this.last_m_id = last_m_id;
        this.match_id = match_id;
        this.last_m_name = last_m_name;
        this.match_name = match_name;
    }
}

module.exports = Match;
module.exports = User;