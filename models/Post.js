const pool = require('../config/db_connection.js');
const mapper = require('mybatis-mapper');
const path = require('path');
const mapperPath = path.join(__dirname, '../sql/Post.xml');
const format = { language: 'sql', indent: ' ' };
mapper.createMapper([mapperPath]);

let PostDAO = {
    findAllPost : function(sort, callback) {
        let query_result = null;

        if (sort) {
            var params = { sort_indicator : sort };
        }

        let query = mapper.getStatement('Post', 'findAllPost', params, format);

        pool.getConnection( (error, connection) => {
            if (error) throw error;

            connection.query(query, function(error, results, fields) {
                if (error) throw error;
                
                return callback(results);
            });
        });

        return query_result;
    }
}

module.exports = PostDAO;