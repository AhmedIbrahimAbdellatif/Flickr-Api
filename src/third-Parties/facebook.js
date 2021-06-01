const axios = require('axios');

const getFacebookData = async (accessToken) => {
    const result = await axios.get(`https://graph.facebook.com/v2.12/me?fields=id,age_range,birthday,email,first_name,last_name&access_token=${accessToken}`);

    const data = result.data;
    if(!data.birthday)
        data.birthday = '3/12/2000';
    if(!data.age_range || !data.age_range.min)
        data.age = 21;
    else{
        data.age = data.age_range.min
    }
    delete data.age_range;

    return data;
}




module.exports = {
    getFacebookData
}