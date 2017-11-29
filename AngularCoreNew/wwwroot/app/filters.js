//convertDateTime filter per DateTime
function convertDateTime() {
    return function (dateString) {
        if (!dateString) {
            return '--';
        }
        else {
            moment.locale('it');
            return moment(dateString, 'YYYY-MM-DDTHH:mm:ss').format('DD-MM-YYYY');
        }
    }
}