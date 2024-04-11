<template>
    <div class="container">
        <div>
            <h1 style="text-align: center; color: #6f4688; padding-top: 15px;">Calendrier</h1>
            <br>
        </div>
        <div>
            <ejs-schedule height='550px' width='100%' :selectedDate='selectedDate' :eventSettings='eventSettings'
                :workDays='workDays' :showWeekend='showWeekend' :locale="locale">
                <e-views>
                    <e-view option='Day'></e-view>
                    <e-view option='Week' startHour='09:00' endHour='18:00'></e-view>
                    <e-view option='WorkWeek'></e-view>
                    <e-view option='Month'></e-view>
                    <e-view option='Agenda'></e-view>
                </e-views>
                <e-resources>
                    <e-resource field="OwnerId" title="Owner" name="Owners" :dataSource="ownerDataSource"
                        textField="OwnerText" idField="Id" colorField="OwnerColor">
                    </e-resource>
                </e-resources>
            </ejs-schedule>
        </div>
    </div>
</template>

<script>
import {
    Day,
    Week,
    WorkWeek,
    Month,
    Agenda,
    MonthAgenda, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective
} from "@syncfusion/ej2-vue-schedule";
import { scheduleData } from '@/utils/datasource.js';
import { loadCldr } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import caGregorian from 'cldr-data/main/fr-CH/ca-gregorian.json';
import numbers from 'cldr-data/main/fr-CH/numbers.json';
import timeZoneNames from 'cldr-data/main/fr-CH/timeZoneNames.json';
loadCldr(numberingSystems, caGregorian, numbers, timeZoneNames);

L10n.load({
    'fr-CH': {
        'schedule': {
            'day': 'Jour',
            'week': 'Semaine',
            'workWeek': 'Semaine de travail',
            'month': 'Mois',
            'today': 'Aujourd\'hui',
            'saveButton': 'Ajouter une séance',
            'cancelButton': 'Fermer',
            'deleteButton': 'Supprimer',
            'newEvent': 'Ajouter une séance',
            'save': 'sauvegarder',
            'Add': 'ajouter',

        },
    }
});

export default {
    name: "App",
    components: {
        'ejs-schedule': ScheduleComponent,
        'e-views': ViewsDirective,
        'e-view': ViewDirective,
        'e-resources': ResourcesDirective,
        'e-resource': ResourceDirective
    },
    data: function () {
        return {
            selectedDate: new Date(2023, 7, 8),
            showWeekend: false,
            workDays: [1, 2, 3, 4, 5, 6],
            locale: 'fr-CH',
            eventSettings: { dataSource: scheduleData },
            ownerDataSource: [
                { OwnerText: "Nancy", Id: 1, OwnerColor: "#ffaa00" },
                { OwnerText: "Steven", Id: 2, OwnerColor: "#f8a398" },
                { OwnerText: "Michael", Id: 3, OwnerColor: "#7499e1" }
            ]
        }
    },
    provide: {
        schedule: [Day, Week, WorkWeek, Month, Agenda, MonthAgenda]
    }
};
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-schedule/styles/material.css";

.e-schedule .e-schedule-toolbar .e-icon-schedule-print::before {
    content: '\e813';
}
</style>