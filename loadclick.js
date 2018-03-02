var monthDiv = $('#Months');
var matrix = $('#matrix');
var YearDiv = $('#Year');
var week = $('#week');
var count = 1;
var count1 = 1;
var variable, countDay;
var masiv = [];
var month, year, day;
var MonthNames = ['Հունվար', 'Փետրվար', 'Մարտ', 'Ապրիլ', 'Մայիս', 'Հունիս', 'Հուլիս', 'Օգոստոս', 'Սեպտեմբեր', 'Հոկտեմբեր', 'Նոյեմբեր', 'Դեկտեմբեր'];
var weekName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
$(document).ready(function () {
    for (var h = 0; h < 7; h++) {
        week.append('<div class="week">' + weekName[h] + '</div>');
    }
    $.ajax({url: 'date.php'}).done(function (response) {
        masiv = response.split(' ');
        day = parseInt(masiv[0]);
        count1 = parseInt(masiv[1]);
        month = parseInt(masiv[1]) - 1;
        year = parseInt(masiv[2]);
        monthDiv.append(day, ' ', MonthNames[month]);
        YearDiv.append(year);
        variable = parseInt(masiv[3]) - 1;
        countDay = parseInt(masiv[4]) + 1;
        $('#matr' + day + '').css('color', 'red');
        matrix.html(print())
    });
    $('.next').on('click', function () {
        month += 1;
        count1 += 1;
        variable = '';
        countDay = '';
        count = 1;
        if (month >= MonthNames.length) {
            year += 1;
            month = 0;
            count1 = 1;
        }
        $.ajax({
            type: 'GET',
            url: 'date.php',
            data: {
                next: count1,
                nextyear: year
            }
        }).done(function (event) {
            masiv = [];
            masiv = event.split(' ');
            variable = parseInt(masiv[3]) - 1;
            countDay = parseInt(masiv[4]) + 1;
            if (!$(matrix).is(':empty')) {
                matrix.children().remove();
                matrix.html(print());
            }
        });
        monthDiv.html(MonthNames[month]);
        YearDiv.html(year);
    });
    $('.prev').on('click', function () {
        month -= 1;
        count1 -= 1;
        variable = '';
        countDay = '';
        count = 1;
        if (month == -1) {
            year -= 1;
            month = 11;
            count1 = 12;
        }
        $.ajax({
            type: 'GET',
            url: 'date.php',
            data: {
                next: count1,
                nextyear: year
            }
        }).done(function (event) {
            masiv = [];
            masiv = event.split(' ');
            variable = parseInt(masiv[3]) - 1;
            countDay = parseInt(masiv[4]) + 1;
            if (!$(matrix).is(':empty')) {
                matrix.children().remove();
                matrix.html(print());
            }
        });
        monthDiv.html(MonthNames[month]);
        YearDiv.html(year);
    });

});

function print() {
    if (variable >= 6 || variable == 5 && countDay > 31) {
        for (var i = 0; i < 6; i++) {
            matrix.append('<br>');
            for (var j = 0; j < 7; j++) {
                if (i == 0) {
                    if (j < variable) {
                        matrix.append('<div class="days weekend'+j+'">&nbsp;</div>');
                    } else if (j >= variable) {
                        matrix.append('<div class="days weekend'+j+'"  id="matr' + count + '">' + count + '</div>');
                        count++;
                    }
                } else {
                    if (count < countDay) {
                        matrix.append('<div class="days weekend'+j+'" id="matr' + count + '">' + count + '&nbsp;</div>');
                        count++;
                    } else {
                        matrix.append('<div class="days weekend'+j+'">&nbsp;</div>');
                    }
                }
            }
        }
    } else {
        for (var i = 0; i < 5; i++) {
            matrix.append('<br>');
            for (var j = 0; j < 7; j++) {
                if (i == 0) {
                    if (j < variable) {
                        matrix.append('<div class="days weekend'+j+'">&nbsp;</div>');
                    } else if (j >= variable) {
                        matrix.append('<div class="days weekend'+j+'" id="matr' + count + '">' + count + '</div>');
                        count++;
                    }
                } else {
                    if (count < countDay) {
                        matrix.append('<div class="days weekend'+j+'" id="matr' + count + '">' + count + '&nbsp;</div>');
                        count++;
                    } else {
                        matrix.append('<div class="days weekend'+j+'">&nbsp;</div>');
                    }
                }
            }
        }
    }
    $('.weekend5, .weekend6').css('background-color', '#523a3a');
}