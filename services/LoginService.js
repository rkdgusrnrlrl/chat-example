/**
 * Created by rkdgusrnrlrl on 17. 4. 11.
 */
module.exports = {
    logind : function logind(session, user) {
        session.logindUser = user;
        session.isLogined = true;
    }
};