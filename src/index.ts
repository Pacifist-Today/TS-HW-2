class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    set addAreas (area: {}) {
        this._areas.push(area)
    }

    set removeAreas (area: {}) {
        this._areas.
            filter((field: {}) =>
                field.areaName != area.areaName)
    }

    set addLecturer (lecturer: {}) {
        this._lecturers.push(lecturer)
    }

    set removeLecturer (lecturer: {}) {
        this._lecturers
            .filter((masters: {}) =>
                masters.name && masters.surname != lecturer.name && lecturer.surname)
    }

    _areas: {}[] = [];
    _lecturers: {}[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): {}[] {
        return this._areas;
    }

    get lecturers(): {}[] {
        return this._lecturers;
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    //           setters?

    set addLevel (level: {}) {
        this._levels.push(level)
    }

    set removeLevel(level: {}) {
        this._levels.
        filter((rate: {}) =>
            rate.levelName != level.levelName)
    }

    _levels: {}[] = [];
    _name;

    constructor(name) {
        this._name = name;
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods
    //           setters?

    set addGroup (group: {}) {
        this._groups.push(group)
    }

    set removeGroup(group: {}) {
        this._groups.
            filter((students:{}) =>
                students.directionName && students.levelName != group.directionName && group.levelName)
    }

    _groups: {}[] = [];
    _name: string;

    constructor(name:string, description:string) {
        this.name = name;
        this._description = description;
    }

    name: string
    _description: string
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods
    //           setters?

    // enum не хочет объвляться вне конструктора, не знаю как до него достучатся
    // проверку реализовал через массив

    // _area _status показывает ошибку TS2564: Property  _area  has no initializer and is not definitely assigned in the constructor.
    // но если им присвоить значения, то ошибки нет
    constructor(directionName: string, levelName: string) {
        this.directionName = directionName;
        this.levelName = levelName;
        enum Status {
            "enrolled",
            "studying",
            "graduated"
        }
    }

    set addStudent (student: {}) {
        this._students.push(student)
    }

    set removeStudent (student: {}) {
        this._students.
            filter((applicant: {}) =>
            applicant._firstName && applicant._lastName != student._firstName && student._lastName)
    }

    set area (sphere: string) {
        this._area = sphere
    }

    set status (state: string) {
        this.statuses.includes(state) ? this._status = state : null
    }

    statuses: string[] = [
        "enrolled",
        "studying",
        "graduated"
    ]

    _area: string;
    _status: string;
    _students: {}[] = []; // Modify the array so that it has a valid toSorted method*

    directionName: string
    levelName: string

    showPerformance() {
        const sortedStudents = this._students.
        toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());

        return sortedStudents;
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    // переделал _grades и _visits в объекты

    set grade(workMark: [string, number]) {
        this._grades[workMark[0]] = workMark[1]
    }

    set visit(presence: [string, boolean]) {
        this._visits[presence[0]] = presence[1]
    }

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    // _grades: number[] = []; // workName: mark
    _grades: {[computedProperty: string]: number} = {}
    // _visits: boolean[] = []; // lesson: present
    _visits: {[computedProperty: string]: boolean} = {}

    constructor(firstName:string, lastName:string, birthYear:number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number =
            gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

        const attendanceValues: boolean[] = Object.values(this._visits)
        const attendancePercentage: number =
            (attendanceValues.filter(present => present).length / attendanceValues.length) * 100;

        // const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}