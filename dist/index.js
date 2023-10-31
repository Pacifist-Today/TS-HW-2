"use strict";
var School = /** @class */ (function () {
    function School() {
        // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
        this._areas = [];
        this._lecturers = []; // Name, surname, position, company, experience, courses, contacts
    }
    Object.defineProperty(School.prototype, "addAreas", {
        set: function (area) {
            this._areas.push(area);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "removeAreas", {
        set: function (area) {
            this._areas.
                filter(function (field) {
                return field.areaName != area.areaName;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "addLecturer", {
        set: function (lecturer) {
            this._lecturers.push(lecturer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "removeLecturer", {
        set: function (lecturer) {
            this._lecturers
                .filter(function (masters) {
                return masters.name && masters.surname != lecturer.name && lecturer.surname;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "areas", {
        get: function () {
            return this._areas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(School.prototype, "lecturers", {
        get: function () {
            return this._lecturers;
        },
        enumerable: false,
        configurable: true
    });
    return School;
}());
var Area = /** @class */ (function () {
    function Area(name) {
        this._levels = [];
        this._name = name;
    }
    Object.defineProperty(Area.prototype, "addLevel", {
        // implement getters for fields and 'add/remove level' methods
        //           setters?
        set: function (level) {
            this._levels.push(level);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "removeLevel", {
        set: function (level) {
            this._levels.
                filter(function (rate) {
                return rate.levelName != level.levelName;
            });
        },
        enumerable: false,
        configurable: true
    });
    return Area;
}());
var Level = /** @class */ (function () {
    function Level(name, description) {
        this._groups = [];
        this.name = name;
        this._description = description;
    }
    Object.defineProperty(Level.prototype, "addGroup", {
        // implement getters for fields and 'add/remove group' methods
        //           setters?
        set: function (group) {
            this._groups.push(group);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "removeGroup", {
        set: function (group) {
            this._groups.
                filter(function (students) {
                return students.directionName && students.levelName != group.directionName && group.levelName;
            });
        },
        enumerable: false,
        configurable: true
    });
    return Level;
}());
var Group = /** @class */ (function () {
    // implement getters for fields and 'add/remove student' and 'set status' methods
    //           setters?
    // enum не хочет объвляться вне конструктора, не знаю как до него достучатся
    // проверку реализовал через массив
    // _area _status показывает ошибку TS2564: Property  _area  has no initializer and is not definitely assigned in the constructor.
    // но если им присвоить значения, то ошибки нет
    function Group(directionName, levelName) {
        this.statuses = [
            "enrolled",
            "studying",
            "graduated"
        ];
        this._students = []; // Modify the array so that it has a valid toSorted method*
        this.directionName = directionName;
        this.levelName = levelName;
        var Status;
        (function (Status) {
            Status[Status["enrolled"] = 0] = "enrolled";
            Status[Status["studying"] = 1] = "studying";
            Status[Status["graduated"] = 2] = "graduated";
        })(Status || (Status = {}));
    }
    Object.defineProperty(Group.prototype, "addStudent", {
        set: function (student) {
            this._students.push(student);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "removeStudent", {
        set: function (student) {
            this._students.
                filter(function (applicant) {
                return applicant._firstName && applicant._lastName != student._firstName && student._lastName;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "area", {
        set: function (sphere) {
            this._area = sphere;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "status", {
        set: function (state) {
            this.statuses.includes(state) ? this._status = state : null;
        },
        enumerable: false,
        configurable: true
    });
    Group.prototype.showPerformance = function () {
        var sortedStudents = this._students.
            toSorted(function (a, b) { return b.getPerformanceRating() - a.getPerformanceRating(); });
        return sortedStudents;
    };
    return Group;
}());
var Student = /** @class */ (function () {
    function Student(firstName, lastName, birthYear) {
        // _grades: number[] = []; // workName: mark
        this._grades = {};
        // _visits: boolean[] = []; // lesson: present
        this._visits = {};
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }
    Object.defineProperty(Student.prototype, "grade", {
        // implement 'set grade' and 'set visit' methods
        // переделал _grades и _visits в объекты
        set: function (workMark) {
            this._grades[workMark[0]] = workMark[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "visit", {
        set: function (presence) {
            this._visits[presence[0]] = presence[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "fullName", {
        get: function () {
            return "".concat(this._lastName, " ").concat(this._firstName);
        },
        set: function (value) {
            var _a;
            _a = value.split(' '), this._lastName = _a[0], this._firstName = _a[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "age", {
        get: function () {
            return new Date().getFullYear() - this._birthYear;
        },
        enumerable: false,
        configurable: true
    });
    Student.prototype.getPerformanceRating = function () {
        var gradeValues = Object.values(this._grades);
        if (!gradeValues.length)
            return 0;
        var averageGrade = gradeValues.reduce(function (sum, grade) { return sum + grade; }, 0) / gradeValues.length;
        var attendanceValues = Object.values(this._visits);
        var attendancePercentage = (attendanceValues.filter(function (present) { return present; }).length / attendanceValues.length) * 100;
        // const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    };
    return Student;
}());
