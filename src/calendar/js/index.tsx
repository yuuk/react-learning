import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from '../css/index.less';

/**
 *  每月总天数
 */
function getMonthDays(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

function createArrayByLength(len: number) {
    return Array.from({ length: len }, (v, k) => k + 1);
}

function isEqualDate(a: string, b: string) {
    return new Date(a).getTime() === new Date(b).getTime();
}

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
        const date = new Date();
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            selectedDate: null,
        };
    }

    weeks = ['一', '二', '三', '四', '五', '六', '日'];

    get today() {
        const date = new Date();
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
        };
    }

    onSelectDate = (date: string, year: number, month: number) => {
        this.gotoDay(year, month);
        this.setState({
            selectedDate: date,
        });
    };

    gotoDay = (year: number, month: number) => {
        this.setState({
            year,
            month,
        });
    };

    gotoToday = () => {
        const { year, month, date } = this.today;
        const formatDate = `${year}-${month}-${date}`;
        this.onSelectDate(formatDate, year, month);
    };

    gotoPrevMonth = () => {
        let { year, month } = this.state;
        if (month <= 1) {
            year--;
            month = 12;
        } else {
            month--;
        }
        this.setState({
            year,
            month,
        });
    };

    gotoNextMonth = () => {
        let { year, month } = this.state;
        if (month >= 12) {
            year++;
            month = 1;
        } else {
            month++;
        }
        this.setState({
            year,
            month,
        });
    };

    getDays = (year: number, month: number) => {
        const prevMonthDays = getMonthDays(year, month - 1); // 上月总天数
        const prevMonthDaysArr = createArrayByLength(prevMonthDays);
        const curMonthDays = getMonthDays(year, month); // 当前月总天数
        const nextMonthDays = getMonthDays(year, month + 1); // 下月总天数
        const nextMonthDaysArr = createArrayByLength(nextMonthDays);
        let day = new Date(year, month, 1).getDay() || 7; // 获取每月一号的星期
        let monthDaysArr = [];

        // 上月
        while (--day > 0) {
            const prevDate = prevMonthDaysArr.pop();
            let prevYear = year;
            let prevMonth = month - 1;
            if (prevMonth < 1) {
                prevMonth = 12;
                prevYear--;
            }
            monthDaysArr.unshift({
                year: prevYear,
                month: prevMonth,
                date: prevDate,
                disabled: true,
            });
        }

        // 当前月
        for (let i = 1; i <= curMonthDays; i++) {
            monthDaysArr.push({
                year,
                month,
                date: i,
                disabled: false,
            });
        }

        // 下月
        let gapDays = (42 - monthDaysArr.length) % 7; // 需要补足的天数
        for (let i = 0; i < gapDays; i++) {
            const nextDate = nextMonthDaysArr.shift();
            let nextYear = year;
            let nextMonth = month + 1;
            if (nextMonth > 12) {
                nextMonth = 1;
                nextYear++;
            }
            monthDaysArr.push({
                year: nextYear,
                month: nextMonth,
                date: nextDate,
                disabled: true,
            });
        }
        return monthDaysArr;
    };

    gotoPrevYear = () => {
        const { year } = this.state;
        this.setState({
            year: year - 1,
        });
    };

    gotoNextYear = () => {
        const { year } = this.state;
        this.setState({
            year: year + 1,
        });
    };

    renderDays = (year: number, month: number) => {
        const { selectedDate } = this.state;
        const days = this.getDays(year, month);
        return days.map(({ year, month, date, disabled }, index) => {
            const isToday =
                this.today.year === year && this.today.month === month && this.today.date === date;
            const dayText = isToday ? '今' : date;
            const formatDate = `${year}-${month}-${date}`;
            return (
                <li
                    className={classnames({
                        [styles.dayItem]: true,
                        [styles.isToday]: isToday,
                        [styles.isSelected]: isEqualDate(formatDate, selectedDate),
                        [styles.disabled]: disabled,
                    })}
                    key={`${year}-${month}-${date}-${index}`}
                    onClick={() => this.onSelectDate(formatDate, year, month)}
                >
                    <span>{dayText}</span>
                </li>
            );
        });
    };

    render() {
        const { year, month } = this.state;
        console.error(this.state);
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={this.gotoPrevYear}>&lt;&lt;</button>
                    <button onClick={this.gotoPrevMonth}>&lt;</button>
                    <span>{year}</span>年<span>{month}</span>月
                    <button onClick={this.gotoNextMonth}>&gt;</button>
                    <button onClick={this.gotoNextYear}>&gt;&gt;</button>
                </div>
                <ul className={styles.weeks}>
                    {this.weeks.map((week) => (
                        <li key={week}>{week}</li>
                    ))}
                </ul>
                <ul className={styles.days}>{this.renderDays(year, month)}</ul>
                <div className={styles.footer}>
                    <span onClick={this.gotoToday}>今天</span>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
