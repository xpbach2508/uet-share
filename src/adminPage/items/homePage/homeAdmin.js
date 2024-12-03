import React, { Fragment, useEffect, useState  } from 'react';
import HereMapComponent from './hereMaps';
import '../../../css/homeAdmin.css';
import '../../../css/upload.css';
import {URL, API_KEY} from "../../../common";
import GroupTable from './groupSelector';

const HomeAdmin = () => {

    const [markers, setMarkers] = useState([]);
    const [noStartMarkers, setNoStart] = useState([]);
    const [colorDirection, setColorDirection] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [group, setGroup] = useState(0);
    const [taxiGroup, setTaxiGroup] = useState(new Map());
    const [endScheduleGroup, setEndScheduleGroup] = useState(new Map());

    const processData = (responseData) => {
        let data;
        try {
            // data = JSON.parse(responseData);
            if (1 == 1) {
                data = [
                    {
                        "groupId": 1,
                        "lat": 21.03687112704608,
                        "lng": 105.77500206292544,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 6.5,
                        "expectedTimeString": "06:30"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.03758066276172,
                        "lng": 105.7833938904472,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 6.6,
                        "expectedTimeString": "06:35"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.034792553267813,
                        "lng": 105.7950214832156,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 6.7,
                        "expectedTimeString": "06:42"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.03441003171452,
                        "lng": 105.79581899276397,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 6.9,
                        "expectedTimeString": "06:54"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.03332741868163,
                        "lng": 105.79780227572328,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.0055000000000005,
                        "expectedTimeString": "07:00"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.03332741868163,
                        "lng": 105.79780227572328,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.0055000000000005,
                        "expectedTimeString": "07:00"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.03332741868163,
                        "lng": 105.79780227572328,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.0055000000000005,
                        "expectedTimeString": "07:00"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.023577228908298,
                        "lng": 105.80533293186562,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.1695,
                        "expectedTimeString": "07:10"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.029112056474073,
                        "lng": 105.80621921548165,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.27,
                        "expectedTimeString": "07:16"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.021024222858966,
                        "lng": 105.80524945124851,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.3222,
                        "expectedTimeString": "07:19"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.023577228908298,
                        "lng": 105.80533293186562,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.4384999999999994,
                        "expectedTimeString": "07:26"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.023577228908298,
                        "lng": 105.80533293186562,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.4384999999999994,
                        "expectedTimeString": "07:26"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.026599173461577,
                        "lng": 105.81275195196973,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.6441,
                        "expectedTimeString": "07:38"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.029923000578,
                        "lng": 105.81138902677259,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.7493,
                        "expectedTimeString": "07:44"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.031054890518806,
                        "lng": 105.82693740756557,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.9064,
                        "expectedTimeString": "07:54"
                    },
                    {
                        "groupId": 1,
                        "lat": 21.021759085325296,
                        "lng": 105.84268448990765,
                        "driverName": "Võ Nam",
                        "licensePlate": "29A-12398",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 8.413599999999999,
                        "expectedTimeString": "08:24"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.04687458779893,
                        "lng": 105.78502263318498,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.5,
                        "expectedTimeString": "06:30"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.03969687533686,
                        "lng": 105.78180473722264,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.6,
                        "expectedTimeString": "06:35"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.025393202394906,
                        "lng": 105.80362642765843,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.7878,
                        "expectedTimeString": "06:47"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.01792766735076,
                        "lng": 105.78409789773787,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.8482,
                        "expectedTimeString": "06:50"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.01185138584541,
                        "lng": 105.78582993030444,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.8682,
                        "expectedTimeString": "06:52"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.00834959000806,
                        "lng": 105.79803738955914,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 6.9082,
                        "expectedTimeString": "06:54"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.023430132488375,
                        "lng": 105.8062305390277,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 7.0869,
                        "expectedTimeString": "07:05"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.021398791590123,
                        "lng": 105.80096514892128,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 7.133799999999999,
                        "expectedTimeString": "07:08"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.018009858860477,
                        "lng": 105.8073083743843,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 7.247499999999999,
                        "expectedTimeString": "07:14"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.012534172341596,
                        "lng": 105.80194346084954,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 7.3941,
                        "expectedTimeString": "07:23"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.012957209800994,
                        "lng": 105.80230320945199,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 7.7087,
                        "expectedTimeString": "07:42"
                    },
                    {
                        "groupId": 2,
                        "lat": 21.036552113470098,
                        "lng": 105.78887983394272,
                        "driverName": "Nguyễn Sơn",
                        "licensePlate": "29A-22298",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.198899999999998,
                        "expectedTimeString": "08:11"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.01690730820983,
                        "lng": 105.77752697778187,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7,
                        "expectedTimeString": "07:00"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.012054468128053,
                        "lng": 105.78577017444634,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.1,
                        "expectedTimeString": "07:05"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.008611766869006,
                        "lng": 105.7902090658313,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.12,
                        "expectedTimeString": "07:07"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.001029530273808,
                        "lng": 105.7946292252221,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.21,
                        "expectedTimeString": "07:12"
                    },
                    {
                        "groupId": 3,
                        "lat": 20.99298559836349,
                        "lng": 105.80568624041116,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.24,
                        "expectedTimeString": "07:14"
                    },
                    {
                        "groupId": 3,
                        "lat": 20.99569737116184,
                        "lng": 105.80769344775048,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.25,
                        "expectedTimeString": "07:15"
                    },
                    {
                        "groupId": 3,
                        "lat": 20.998206079393842,
                        "lng": 105.81329203048001,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.3273,
                        "expectedTimeString": "07:19"
                    },
                    {
                        "groupId": 3,
                        "lat": 20.999582089292257,
                        "lng": 105.83084929839517,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.4131,
                        "expectedTimeString": "07:24"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.02301915839655,
                        "lng": 105.82130677586595,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.6331,
                        "expectedTimeString": "07:37"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.00778305950893,
                        "lng": 105.82371909896521,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.7078999999999995,
                        "expectedTimeString": "07:42"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.01883580552601,
                        "lng": 105.82886656279535,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.7711,
                        "expectedTimeString": "07:46"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.000307341365087,
                        "lng": 105.84262944711088,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.9078,
                        "expectedTimeString": "07:54"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.00747317260014,
                        "lng": 105.84268448990765,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.9531,
                        "expectedTimeString": "07:57"
                    },
                    {
                        "groupId": 3,
                        "lat": 21.008570463672772,
                        "lng": 105.84267946497118,
                        "driverName": "Dương Văn Quang",
                        "licensePlate": "29A-98723",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 8.0554,
                        "expectedTimeString": "08:03"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.029423204411408,
                        "lng": 105.83955657997878,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7,
                        "expectedTimeString": "07:00"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.032194141017882,
                        "lng": 105.83256874131636,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.09,
                        "expectedTimeString": "07:05"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.03099399786333,
                        "lng": 105.82252147091617,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.19,
                        "expectedTimeString": "07:11"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.03091233461506,
                        "lng": 105.81583943381133,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.2,
                        "expectedTimeString": "07:12"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.039484204976425,
                        "lng": 105.79918828061695,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.29,
                        "expectedTimeString": "07:17"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.038444339053434,
                        "lng": 105.7855284450049,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.316999999999999,
                        "expectedTimeString": "07:19"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.046699748682318,
                        "lng": 105.7850071200194,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.3423,
                        "expectedTimeString": "07:20"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.03796213326152,
                        "lng": 105.7747188580213,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.4688,
                        "expectedTimeString": "07:28"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.036866482690574,
                        "lng": 105.78205893233932,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.478899999999999,
                        "expectedTimeString": "07:28"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.046699748682318,
                        "lng": 105.7850071200194,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.481399999999999,
                        "expectedTimeString": "07:28"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.032727899819783,
                        "lng": 105.77265795329014,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.5488,
                        "expectedTimeString": "07:32"
                    },
                    {
                        "groupId": 4,
                        "lat": 21.036866482690574,
                        "lng": 105.78205893233932,
                        "driverName": "Vũ Thế Tân",
                        "licensePlate": "29A-00934",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.5865,
                        "expectedTimeString": "07:35"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.04447573301072,
                        "lng": 105.8061633033473,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.5,
                        "expectedTimeString": "07:30"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.037162885377256,
                        "lng": 105.80631610012051,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.55,
                        "expectedTimeString": "07:32"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.028835901646428,
                        "lng": 105.80368255266055,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.6864,
                        "expectedTimeString": "07:41"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.03332741868163,
                        "lng": 105.79780227572328,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.7677,
                        "expectedTimeString": "07:46"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.039079325800067,
                        "lng": 105.8071758010875,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.8241,
                        "expectedTimeString": "07:49"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.023577228908298,
                        "lng": 105.80533293186562,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 7.9646,
                        "expectedTimeString": "07:57"
                    },
                    {
                        "groupId": 5,
                        "lat": 21.002551398496507,
                        "lng": 105.82245226919552,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 8.399700000000001,
                        "expectedTimeString": "08:23"
                    },
                    {
                        "groupId": 5,
                        "lat": 20.995163884211134,
                        "lng": 105.83509859767653,
                        "driverName": "Đinh Trọng Đạt",
                        "licensePlate": "29A-77765",
                        "nameCar": "Mazda CX3",
                        "expectedTime": 8.4197,
                        "expectedTimeString": "08:25"
                    },
                    {
                        "groupId": 6,
                        "lat": 20.994866379504213,
                        "lng": 105.77853641628967,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8,
                        "expectedTimeString": "08:00"
                    },
                    {
                        "groupId": 6,
                        "lat": 21.005701837189882,
                        "lng": 105.7932419327444,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8.09,
                        "expectedTimeString": "08:05"
                    },
                    {
                        "groupId": 6,
                        "lat": 21.01295930550674,
                        "lng": 105.80268318957852,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8.12,
                        "expectedTimeString": "08:07"
                    },
                    {
                        "groupId": 6,
                        "lat": 21.02485686362014,
                        "lng": 105.80960732646928,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8.3375,
                        "expectedTimeString": "08:20"
                    },
                    {
                        "groupId": 6,
                        "lat": 21.04047280909213,
                        "lng": 105.81650204880462,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8.3875,
                        "expectedTimeString": "08:23"
                    },
                    {
                        "groupId": 6,
                        "lat": 21.041418668708946,
                        "lng": 105.83477993715117,
                        "driverName": "Đào Văn Thắng",
                        "licensePlate": "29A-00035",
                        "nameCar": "Vinfast VF8",
                        "expectedTime": 8.5375,
                        "expectedTimeString": "08:32"
                    },
                    {
                        "groupId": 7,
                        "lat": 21.04572869035155,
                        "lng": 105.78114272821843,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8,
                        "expectedTimeString": "08:00"
                    },
                    {
                        "groupId": 7,
                        "lat": 21.025997068162813,
                        "lng": 105.77928421024248,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.11,
                        "expectedTimeString": "08:06"
                    },
                    {
                        "groupId": 7,
                        "lat": 20.99572902095581,
                        "lng": 105.80982875336598,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.494800000000001,
                        "expectedTimeString": "08:29"
                    },
                    {
                        "groupId": 7,
                        "lat": 21.00898365005589,
                        "lng": 105.82435655193133,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.544799999999999,
                        "expectedTimeString": "08:32"
                    },
                    {
                        "groupId": 7,
                        "lat": 21.00646634176167,
                        "lng": 105.83077144088884,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.5948,
                        "expectedTimeString": "08:35"
                    },
                    {
                        "groupId": 7,
                        "lat": 21.010737218345795,
                        "lng": 105.83681950728726,
                        "driverName": "Nguyễn Thanh Loa",
                        "licensePlate": "29A-33562",
                        "nameCar": "Mazda CX8",
                        "expectedTime": 8.674800000000001,
                        "expectedTimeString": "08:40"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.032879112464922,
                        "lng": 105.83086928354955,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.5,
                        "expectedTimeString": "07:30"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.04078930637229,
                        "lng": 105.81597139879806,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.6677,
                        "expectedTimeString": "07:40"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.031422498575804,
                        "lng": 105.82129444615893,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.7454,
                        "expectedTimeString": "07:44"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.021583465022847,
                        "lng": 105.80907585707345,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.9217,
                        "expectedTimeString": "07:55"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.03668037642473,
                        "lng": 105.78992898834818,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 8.132,
                        "expectedTimeString": "08:07"
                    },
                    {
                        "groupId": 8,
                        "lat": 21.036803493003614,
                        "lng": 105.7826292512198,
                        "driverName": "Văn Toàn",
                        "licensePlate": "29A-77889",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 8.212,
                        "expectedTimeString": "08:12"
                    },
                    {
                        "groupId": 9,
                        "lat": 21.043908835580563,
                        "lng": 105.78102861413323,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.25,
                        "expectedTimeString": "07:15"
                    },
                    {
                        "groupId": 9,
                        "lat": 21.03880193405791,
                        "lng": 105.7805796843511,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.512700000000001,
                        "expectedTimeString": "07:30"
                    },
                    {
                        "groupId": 9,
                        "lat": 21.02636443516133,
                        "lng": 105.77858892212281,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.6417,
                        "expectedTimeString": "07:38"
                    },
                    {
                        "groupId": 9,
                        "lat": 21.008671712043324,
                        "lng": 105.78893968929019,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.8437,
                        "expectedTimeString": "07:50"
                    },
                    {
                        "groupId": 9,
                        "lat": 20.996370236245916,
                        "lng": 105.80765825742326,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.9373000000000005,
                        "expectedTimeString": "07:56"
                    },
                    {
                        "groupId": 9,
                        "lat": 20.999907050208076,
                        "lng": 105.81799820220208,
                        "driverName": "Bạch Đậu Khấu",
                        "licensePlate": "29A-99996",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.987299999999999,
                        "expectedTimeString": "07:59"
                    },
                    {
                        "groupId": 10,
                        "lat": 21.03609220833617,
                        "lng": 105.79071967119981,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.25,
                        "expectedTimeString": "07:15"
                    },
                    {
                        "groupId": 10,
                        "lat": 21.02854045787482,
                        "lng": 105.78903798764784,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.3,
                        "expectedTimeString": "07:17"
                    },
                    {
                        "groupId": 10,
                        "lat": 21.015561341045363,
                        "lng": 105.77899579731927,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.39,
                        "expectedTimeString": "07:23"
                    },
                    {
                        "groupId": 10,
                        "lat": 20.99903467695598,
                        "lng": 105.79810485877522,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.4977,
                        "expectedTimeString": "07:29"
                    },
                    {
                        "groupId": 10,
                        "lat": 21.009959363685493,
                        "lng": 105.772055412909,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.626,
                        "expectedTimeString": "07:37"
                    },
                    {
                        "groupId": 10,
                        "lat": 21.028238792037943,
                        "lng": 105.77869296113265,
                        "driverName": "Đào Tấn Lợi",
                        "licensePlate": "29A-00034",
                        "nameCar": "SantaFe 2023",
                        "expectedTime": 7.7344,
                        "expectedTimeString": "07:44"
                    }
                  ];
            }
        } catch (error) {
            console.error("Failed to parse response data: ", error);
            return;
        }
        let listPointMarker = [], index = 0;
        let listPointSchedule = [], listColorDirection = [], index2 = 0;
        let listPointMarkerNoPointStart = [], index3 = 0;
        let len = data.length;
        let tempEndStartGroup = new Map();
        let tempTaxiGroup = new Map();
        for (let i = 0; i < len; i++) {
            if (i === 0) {
            // marker
            listPointMarker[index] = {
                lat: data[i].lat,
                lng: data[i].lng,
                driverName: data[i].driverName,
                licensePlate: data[i].licensePlate,
                nameCar: data[i].nameCar,
                groupId: data[i].groupId,
                expectedTimeString: data[i].expectedTimeString,
            };
            tempTaxiGroup.set(data[i].groupId, index);
            tempEndStartGroup.set(data[i].groupId, [index2, index3]);
            // console.log(endScheduleGroup);
            index++;
            }
            else if (data[i].groupId === data[i - 1].groupId) {
            // schedule
            listPointSchedule[index2] = {
                origin: [data[i - 1].lat, data[i - 1].lng],
                destination: [data[i].lat, data[i].lng],
                transportMode: 'car'
            };
            listColorDirection[index2] = data[i].groupId;
            index2++;

            // markersFullNoStart
            listPointMarkerNoPointStart[index3] = {
                lat: data[i].lat,
                lng: data[i].lng,
                expectedTimeString: data[i].expectedTimeString
            };
            index3++;
            } else {
            // marker
            const initScheduleIndex = tempEndStartGroup.get(data[i-1].groupId);
            // console.log(initScheduleIndex);

            // Update the accumulated tempEndScheduleGroup
            if (initScheduleIndex) {
                tempEndStartGroup.set(data[i-1].groupId, [initScheduleIndex[0], initScheduleIndex[1], index2--, index3--]);
                tempEndStartGroup.set(data[i].groupId, [index2, index3]);
            }
            listPointMarker[index] = {
                lat: data[i].lat,
                lng: data[i].lng,
                driverName: data[i].driverName,
                licensePlate: data[i].licensePlate,
                nameCar: data[i].nameCar,
                groupId: data[i].groupId,
                expectedTimeString: data[i].expectedTimeString
            };
            tempTaxiGroup.set(data[i].groupId, index);
            index++;
            }
            if (i == len - 1) {
                const initScheduleIndex = tempEndStartGroup.get(data[i].groupId);
                // Update the accumulated tempEndScheduleGroup
                if (initScheduleIndex) {
                    tempEndStartGroup.set(data[i].groupId, [initScheduleIndex[0], initScheduleIndex[1], index2--, index3--]);
                }
            }
        }
        setMarkers(listPointMarker);
        setNoStart(listPointMarkerNoPointStart);
        setColorDirection(listColorDirection);
        setSchedule(listPointSchedule);
        setEndScheduleGroup(tempEndStartGroup);
        setTaxiGroup(tempTaxiGroup);
    };

    // Function to fetch data in real-time
    useEffect(() => {
        const fetchData = () => {
            // const xmlHttp = new XMLHttpRequest();
            // const jwtToken = localStorage.getItem('jwt');
            // xmlHttp.onreadystatechange = function() {
            //     if (this.readyState === 4 && this.status === 200) {
            //         const data = JSON.parse(this.responseText);
            //         setMarkers(data.markers);
            //         setDirections(data.directions);
            //     }
            // };
            // xmlHttp.open("GET", URL + '/schedule/admin', false);
            // xmlHttp.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
            // xmlHttp.send();
            processData(1);
        };

        // Fetch data on component mount and then set up interval
        fetchData();
        const interval = setInterval(fetchData, 30000); // Fetch every 5 seconds

        return () => clearInterval(interval);
    }, []);
    
    return(
        <div className='admin-container'>
            <div className='container-table'>
                <GroupTable markers={markers} setGroup={setGroup}/>
            </div>
            <div className='container-map'>
                <HereMapComponent markers={markers} noStartMarkers={noStartMarkers} 
                endScheduleGroup={endScheduleGroup} schedule={schedule} groupId={group} taxiGroup={taxiGroup}
                />
            </div>
        </div>
    );
}

export default HomeAdmin