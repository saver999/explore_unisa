import React, { useRef, useEffect, useState, useContext  } from "react";
import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import { createControlComponent } from "@react-leaflet/core";
import 'lrm-valhalla';

var myGeo = {
    "type": "FeatureCollection",
    "name": "edifici",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": null, "Nome": "F3", "Tipologia": null, "Note": null, "Area": 1086, "Area2": 1086 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.789036573025902, 40.775221161202765 ], [ 14.789254996422033, 40.775310476994783 ], [ 14.789451978169794, 40.775035703307687 ], [ 14.789078856355539, 40.774879149786578 ], [ 14.788980576183942, 40.775029212704695 ], [ 14.789024916540431, 40.775046520977945 ], [ 14.788977376364402, 40.775111946210103 ], [ 14.789084798877543, 40.775157639984812 ], [ 14.789036573025902, 40.775221161202765 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "H", "Tipologia": null, "Note": null, "Area": 613, "Area2": 613 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.788564749636311, 40.775840105871197 ], [ 14.788682457283548, 40.775938588683651 ], [ 14.788960613024679, 40.775746296096862 ], [ 14.788807478804008, 40.775618735360943 ], [ 14.788713084127684, 40.775680179165256 ], [ 14.788617775217201, 40.775680871489499 ], [ 14.788610461343975, 40.775802028119003 ], [ 14.788564749636311, 40.775840105871197 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "F2", "Tipologia": null, "Note": null, "Area": 2258, "Area2": 2258 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.789315564434688, 40.774557046680506 ], [ 14.789805593940846, 40.774762670136404 ], [ 14.790083521123435, 40.774388808834118 ], [ 14.789594405851439, 40.774181799541431 ], [ 14.789315564434688, 40.774557046680506 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "F1", "Tipologia": null, "Note": null, "Area": 1603, "Area2": 1603 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.78858509134623, 40.773678985822556 ], [ 14.788994668246891, 40.773849302496359 ], [ 14.789232369126742, 40.773534977887792 ], [ 14.78881730682116, 40.773360506317914 ], [ 14.78858509134623, 40.773678985822556 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "F1", "Tipologia": null, "Note": null, "Area": 1287, "Area2": 1287 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.790315622319101, 40.772863398300849 ], [ 14.790360076954803, 40.772803596232713 ], [ 14.790254482910097, 40.772757684478165 ], [ 14.790294937771383, 40.772701084458113 ], [ 14.790060665269602, 40.772601904490202 ], [ 14.789840220559393, 40.772903684613055 ], [ 14.790226713047685, 40.773065521969222 ], [ 14.7903604197926, 40.772883866000647 ], [ 14.790315622319101, 40.772863398300849 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Biblioteca Scientifica", "Tipologia": null, "Note": null, "Area": 1849, "Area2": 1849 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.788412872487593, 40.772517783144842 ], [ 14.788803250471039, 40.772679794529836 ], [ 14.78884987641286, 40.772617482505439 ], [ 14.788912958569433, 40.772640330254497 ], [ 14.788936728657415, 40.7726091742311 ], [ 14.788993411174921, 40.772632714339011 ], [ 14.789100376570852, 40.772486627063977 ], [ 14.789047350989966, 40.772462394546537 ], [ 14.789076606482871, 40.772423622500241 ], [ 14.789008953155527, 40.77239454345068 ], [ 14.789044608287503, 40.772348155416701 ], [ 14.788655144538213, 40.772187527944318 ], [ 14.788412872487593, 40.772517783144842 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Osservatorio dell'Appennino meridionale", "Tipologia": null, "Note": null, "Area": 263, "Area2": 263 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.786344417715814, 40.773849518853631 ], [ 14.786496637702335, 40.773848480338664 ], [ 14.786498009053563, 40.773809362929363 ], [ 14.786602231747038, 40.773809362929363 ], [ 14.786600403278729, 40.773710703874414 ], [ 14.78648840959495, 40.773712088563911 ], [ 14.786487952477877, 40.773733551247538 ], [ 14.786343960598737, 40.77373424359206 ], [ 14.786344417715814, 40.773849518853631 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Osservatorio dell'Appennino Meridionale 2", "Tipologia": null, "Note": null, "Area": 265, "Area2": 265 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.786482467072961, 40.773622776031786 ], [ 14.786481552838804, 40.773670547866224 ], [ 14.786591260937199, 40.773668470830664 ], [ 14.78658668976643, 40.773504384815773 ], [ 14.786357216993963, 40.773507154203358 ], [ 14.786359045462268, 40.773593697507053 ], [ 14.7864797243705, 40.773590235777057 ], [ 14.786482467072961, 40.773622776031786 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "I1", "Tipologia": null, "Note": null, "Area": 999, "Area2": 999 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.786895700910236, 40.776302099769104 ], [ 14.786851817670877, 40.776522429529095 ], [ 14.787016836935548, 40.776540083570943 ], [ 14.78708403314581, 40.77620032898124 ], [ 14.787020036755081, 40.776192021154934 ], [ 14.787057520355365, 40.776003017825929 ], [ 14.786865531183176, 40.775982248196563 ], [ 14.786830790285354, 40.776168482308101 ], [ 14.78679056398261, 40.776162943754692 ], [ 14.786773193533699, 40.776254329826862 ], [ 14.786883815866245, 40.776266791554235 ], [ 14.786877416227172, 40.776297945862439 ], [ 14.786895700910236, 40.776302099769104 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "E2", "Tipologia": null, "Note": null, "Area": 1097, "Area2": 1097 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.791385276278406, 40.772229588839366 ], [ 14.791448586993521, 40.772255206161589 ], [ 14.791413617537156, 40.77230505605759 ], [ 14.79161269202403, 40.7723877929552 ], [ 14.791828451284204, 40.772089731933107 ], [ 14.791445387173985, 40.771930488562617 ], [ 14.791354877992809, 40.772052344393451 ], [ 14.791479213837656, 40.772102886803175 ], [ 14.791385276278406, 40.772229588839366 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "D3", "Tipologia": null, "Note": null, "Area": 1557, "Area2": 1557 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.790431044380927, 40.771775399000163 ], [ 14.790678744696837, 40.771875748565861 ], [ 14.79074022694364, 40.771798723039517 ], [ 14.790814737027127, 40.771830398716212 ], [ 14.790895646749693, 40.771710619575181 ], [ 14.790972442418569, 40.77174281456783 ], [ 14.791104834951888, 40.771563794632662 ], [ 14.790717713927618, 40.771400612154068 ], [ 14.790431044380927, 40.771775399000163 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "D2", "Tipologia": null, "Note": null, "Area": 1533, "Area2": 1533 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.791456757961267, 40.770886353214358 ], [ 14.791486013454172, 40.770846195499196 ], [ 14.791252883745086, 40.770747878232029 ], [ 14.791126719431935, 40.770911971054453 ], [ 14.791204429334964, 40.770944512620872 ], [ 14.791084207543811, 40.771102892889495 ], [ 14.791450815439271, 40.771263522983979 ], [ 14.791595264435488, 40.771073813261907 ], [ 14.7916615464116, 40.770978265824503 ], [ 14.791456757961267, 40.770886353214358 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "B2", "Tipologia": null, "Note": null, "Area": 1817, "Area2": 1817 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.792249856089223, 40.770175800402477 ], [ 14.79252595480351, 40.770296967070976 ], [ 14.792597265067462, 40.770200033753852 ], [ 14.792675889204645, 40.770236037573873 ], [ 14.792730743253841, 40.770168876586169 ], [ 14.792823995137477, 40.770213881379242 ], [ 14.792984214672833, 40.770001320011673 ], [ 14.792531668766964, 40.769802432578871 ], [ 14.792249856089223, 40.770175800402477 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "A1", "Tipologia": null, "Note": null, "Area": 4138, "Area2": 4138 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.791551152637576, 40.768943522834157 ], [ 14.792099578850269, 40.769161626723026 ], [ 14.792381505807283, 40.768651158641134 ], [ 14.791701087038714, 40.768363293765077 ], [ 14.791383847787531, 40.768809890573984 ], [ 14.791588636237861, 40.768890900836325 ], [ 14.791551152637576, 40.768943522834157 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "B1", "Tipologia": null, "Note": null, "Area": 1620, "Area2": 1620 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.793006499130311, 40.769605448616488 ], [ 14.793391391708836, 40.76976746710266 ], [ 14.79361172213977, 40.769471125298516 ], [ 14.793401448284522, 40.769385961404716 ], [ 14.793432075128656, 40.769348918538789 ], [ 14.793201231004955, 40.769248521882474 ], [ 14.793043068496441, 40.769460393269121 ], [ 14.793098836779791, 40.769486704047772 ], [ 14.793006499130311, 40.769605448616488 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "A2", "Tipologia": null, "Note": null, "Area": 1791, "Area2": 1791 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.791988499400643, 40.769685765522262 ], [ 14.792017754893541, 40.769783218878857 ], [ 14.792513269804614, 40.769682130491987 ], [ 14.792609264390711, 40.769555423598106 ], [ 14.792562638448894, 40.769443949027185 ], [ 14.792493156653245, 40.769425254515625 ], [ 14.792473957736023, 40.769369863339364 ], [ 14.792211115416961, 40.769278121602113 ], [ 14.7920890651575, 40.769465586186804 ], [ 14.79210415002103, 40.769520284894853 ], [ 14.792051581557214, 40.769526516390378 ], [ 14.7920675806549, 40.769600948097349 ], [ 14.792018669127696, 40.769618257784693 ], [ 14.792027811469234, 40.769644914694396 ], [ 14.791988499400643, 40.769685765522262 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "C1", "Tipologia": null, "Note": null, "Area": 1158, "Area2": 1158 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.793470115000348, 40.770862870156691 ], [ 14.793644696316031, 40.770935041063026 ], [ 14.79373774082676, 40.770808501562264 ], [ 14.793798678428853, 40.770834553832117 ], [ 14.793817352855299, 40.77080372531168 ], [ 14.793761657197473, 40.770779161731824 ], [ 14.793866864656994, 40.770637424736421 ], [ 14.793498290450783, 40.770480118027777 ], [ 14.79336781518178, 40.770657801386541 ], [ 14.793446567203839, 40.770693282174847 ], [ 14.793413026951077, 40.770738191397257 ], [ 14.793479288402812, 40.770766104572658 ], [ 14.793470196905732, 40.770777455927309 ], [ 14.793518602984818, 40.770797367315225 ], [ 14.793470115000348, 40.770862870156691 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "C2", "Tipologia": null, "Note": null, "Area": 1318, "Area2": 1318 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.792676738545147, 40.771604703938216 ], [ 14.792756022952167, 40.771637454969067 ], [ 14.792710811182875, 40.771700475846671 ], [ 14.792766506840705, 40.771722806064567 ], [ 14.792748160035769, 40.771746624955362 ], [ 14.792792716562035, 40.771766474024503 ], [ 14.792752746737005, 40.771821555160315 ], [ 14.792933593814187, 40.771897973957806 ], [ 14.793025327838842, 40.771771436290862 ], [ 14.793075781552405, 40.771794262711346 ], [ 14.793231074151285, 40.771584854820745 ], [ 14.793007308655428, 40.771491563889242 ], [ 14.792982081798646, 40.771521089490783 ], [ 14.792796975641753, 40.771441692885418 ], [ 14.792676738545147, 40.771604703938216 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "D1", "Tipologia": null, "Note": null, "Area": 1091, "Area2": 1091 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.792022478376436, 40.771519383705332 ], [ 14.792192350132812, 40.771589103772982 ], [ 14.79241300322426, 40.771291614433537 ], [ 14.792066379659664, 40.771144233900429 ], [ 14.79193467580998, 40.771322380698848 ], [ 14.791985784766574, 40.771344214814 ], [ 14.791947125427608, 40.771391356629032 ], [ 14.792072276846966, 40.771448422991966 ], [ 14.792022478376436, 40.771519383705332 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Piscina", "Tipologia": null, "Note": null, "Area": 2126, "Area2": 2126 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.787145013047569, 40.772408619226539 ], [ 14.787288511271857, 40.772207152846484 ], [ 14.787521777791699, 40.772302923886585 ], [ 14.787716384972587, 40.772027354337872 ], [ 14.787324003602821, 40.771866205169154 ], [ 14.787196504229248, 40.772044350031926 ], [ 14.787078123654553, 40.771996877863543 ], [ 14.786867763338991, 40.772293247544376 ], [ 14.787145013047569, 40.772408619226539 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Laboratorio", "Tipologia": null, "Note": null, "Area": 1498, "Area2": 1498 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.790064584892669, 40.770957692021263 ], [ 14.790403563955376, 40.770475434797177 ], [ 14.790144961371457, 40.770370067206677 ], [ 14.789807074380468, 40.770854227423833 ], [ 14.789869431675838, 40.770880031559159 ], [ 14.789872707891007, 40.770880114264685 ], [ 14.789875874899003, 40.770879535325875 ], [ 14.789886577201882, 40.770879948853612 ], [ 14.789895532190011, 40.770880362381327 ], [ 14.789902521449033, 40.770882843547653 ], [ 14.78990721735744, 40.770885076597253 ], [ 14.789910711986954, 40.770887144235701 ], [ 14.78991311454474, 40.770889046463033 ], [ 14.789915189481016, 40.770890700573702 ], [ 14.789916609174256, 40.770892602800927 ], [ 14.789918465696186, 40.7708948358502 ], [ 14.78992010380377, 40.770897647838062 ], [ 14.789920431425287, 40.770900459825832 ], [ 14.790064584892669, 40.770957692021263 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Laboratorio", "Tipologia": null, "Note": null, "Area": 817, "Area2": 817 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.789760333710747, 40.770544577018491 ], [ 14.789946422732289, 40.7702905038133 ], [ 14.789681704546725, 40.770181331434543 ], [ 14.789498236497318, 40.770437720827914 ], [ 14.789760333710747, 40.770544577018491 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Laboratorio", "Tipologia": null, "Note": null, "Area": 437, "Area2": 437 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.788982259910167, 40.770210630175782 ], [ 14.789243483466221, 40.770313186006632 ], [ 14.789341333092572, 40.770176224313204 ], [ 14.789073993934871, 40.770069698356487 ], [ 14.788982259910167, 40.770210630175782 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Laboratorio", "Tipologia": null, "Note": null, "Area": 924, "Area2": 924 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.788626462942926, 40.770629123135762 ], [ 14.788925253766237, 40.770755497566803 ], [ 14.789110469130398, 40.770506718352991 ], [ 14.788810804649707, 40.77037703520201 ], [ 14.788626462942926, 40.770629123135762 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Laboratorio", "Tipologia": null, "Note": null, "Area": 408, "Area2": 408 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.789266416972389, 40.770759467440328 ], [ 14.789531135157956, 40.770864999824468 ], [ 14.789620685039216, 40.770735979018539 ], [ 14.789356403682342, 40.770631108076337 ], [ 14.789266416972389, 40.770759467440328 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "F", "Tipologia": null, "Note": null, "Area": 818, "Area2": 818 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.788038819148959, 40.7754406930325 ], [ 14.789464846404387, 40.773492834466211 ], [ 14.788333460099729, 40.775572268393603 ], [ 14.788537895926211, 40.775316064213186 ], [ 14.788636619209933, 40.775359399011627 ], [ 14.788699085712469, 40.775271736985516 ], [ 14.788588568054141, 40.775224763323919 ], [ 14.78876329952976, 40.774986255698714 ], [ 14.788864643785622, 40.775025951895458 ], [ 14.788924926144709, 40.774939281835266 ], [ 14.788833847363041, 40.774900247191077 ], [ 14.78900115275095, 40.77466885067259 ], [ 14.789105991636324, 40.774714501514886 ], [ 14.789172389597059, 40.774625184620163 ], [ 14.789066677054311, 40.774581518539037 ], [ 14.789240534872551, 40.774341354579853 ], [ 14.789331395239872, 40.774379066333381 ], [ 14.789388947419653, 40.774304387116466 ], [ 14.789298087052329, 40.774265682904577 ], [ 14.789480244615666, 40.774017247640117 ], [ 14.789565863038723, 40.77405231312656 ], [ 14.789617408824029, 40.773982843748641 ], [ 14.789533537715732, 40.773948439839344 ], [ 14.789718207044034, 40.773692808311118 ], [ 14.789800767666264, 40.773726219928768 ], [ 14.789852531865918, 40.773662787462143 ], [ 14.789451523129365, 40.77349076690885 ], [ 14.78833324168539, 40.77557301269097 ], [ 14.788038819148959, 40.7754406930325 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Mensa", "Tipologia": null, "Note": null, "Area": 5726, "Area2": 5726 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.793248219680303, 40.773158054738381 ], [ 14.793730041724334, 40.773353563657864 ], [ 14.793858469358916, 40.773176249332167 ], [ 14.794171238700281, 40.773302618918706 ], [ 14.794413241794013, 40.772966184173448 ], [ 14.794122750715797, 40.772845437758008 ], [ 14.79426472003974, 40.772646950022931 ], [ 14.793762803876012, 40.772437214005194 ], [ 14.793527790041299, 40.772759757291766 ], [ 14.793491096431421, 40.772702857461638 ], [ 14.793346069306651, 40.77273593876415 ], [ 14.793426445785437, 40.772903991526604 ], [ 14.793248219680303, 40.773158054738381 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Chiostro della pace", "Tipologia": null, "Note": null, "Area": 796, "Area2": 796 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.792416716270688, 40.769173153258222 ], [ 14.79266483496607, 40.769271740728129 ], [ 14.792857039589252, 40.769011046026627 ], [ 14.792606299921736, 40.768907826522067 ], [ 14.792416716270688, 40.769173153258222 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "D", "Tipologia": null, "Note": null, "Area": 3415, "Area2": 3415 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.790933682871344, 40.771938178563104 ], [ 14.791226358093011, 40.772063558055557 ], [ 14.79126436218896, 40.772013935593428 ], [ 14.791291445567676, 40.772025844987709 ], [ 14.791482776533488, 40.771758379326585 ], [ 14.791560532040137, 40.771792122734645 ], [ 14.791605525395113, 40.771731583078562 ], [ 14.791522746358538, 40.77169734341259 ], [ 14.791711565559375, 40.771432771099178 ], [ 14.791798931297182, 40.771467837949636 ], [ 14.791847200867325, 40.771394230624246 ], [ 14.791762892930343, 40.771358667505254 ], [ 14.791822301632051, 40.771274970043066 ], [ 14.791896125680498, 40.771307059596367 ], [ 14.791929761489559, 40.771260744772214 ], [ 14.791861179385377, 40.771227331914758 ], [ 14.791872973759983, 40.771197888887819 ], [ 14.791595587542433, 40.771073831046735 ], [ 14.790933682871344, 40.771938178563104 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Edisu", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.794075900838873, 40.770646574069545 ], [ 14.794282957637483, 40.770659807002055 ], [ 14.79428033666535, 40.770704798952863 ], [ 14.794459436427864, 40.770712738705718 ], [ 14.794467299344264, 40.770664438527803 ], [ 14.79442711110487, 40.770665100174305 ], [ 14.794439342308161, 40.770553943468201 ], [ 14.794087258384785, 40.770531447445535 ], [ 14.794075900838873, 40.770646574069545 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Residenze", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.795239612466526, 40.770843744490982 ], [ 14.795302515797747, 40.770841097912012 ], [ 14.79538900787818, 40.77089138289432 ], [ 14.795494720420933, 40.770800075924598 ], [ 14.79538551324867, 40.770716046935796 ], [ 14.79531037871415, 40.770773610112812 ], [ 14.795305136769883, 40.77062870960647 ], [ 14.795380271304403, 40.770680318042224 ], [ 14.795486857504532, 40.770591657371469 ], [ 14.795372408387998, 40.770504981526756 ], [ 14.795294652881346, 40.770569823009026 ], [ 14.795296400196102, 40.770416320622047 ], [ 14.79537590301751, 40.770465282628834 ], [ 14.795482489217635, 40.770371328475903 ], [ 14.795364545471591, 40.770291268846407 ], [ 14.795231749550119, 40.770385223112527 ], [ 14.795238738809147, 40.770551958525324 ], [ 14.795189813995972, 40.770553281820575 ], [ 14.795189813995972, 40.770649882302912 ], [ 14.795237865151764, 40.77064855900958 ], [ 14.795239612466526, 40.770843744490982 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Residenze", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.795271937789504, 40.771178535879855 ], [ 14.795209908115661, 40.771177874238475 ], [ 14.79514613112706, 40.771132882607979 ], [ 14.795048281500708, 40.771221542556567 ], [ 14.795134773581141, 40.771275797093622 ], [ 14.795203792514013, 40.771224850761307 ], [ 14.795352314268293, 40.771220880915585 ], [ 14.795424827830676, 40.771271165610479 ], [ 14.795514814540622, 40.771203678248092 ], [ 14.795409101997869, 40.771129574398657 ], [ 14.795352314268293, 40.771172581107045 ], [ 14.795318241630547, 40.77117721259706 ], [ 14.795317367973169, 40.771041575970123 ], [ 14.795353187925667, 40.771039591041813 ], [ 14.795409975655247, 40.771075981384627 ], [ 14.795438806348727, 40.771069364960134 ], [ 14.795499962365193, 40.771019080112531 ], [ 14.795390755192928, 40.77094232948231 ], [ 14.795348819638779, 40.770985997955208 ], [ 14.795210781773037, 40.770987321241812 ], [ 14.795151373071327, 40.770945637700954 ], [ 14.795050028815462, 40.771030328042279 ], [ 14.795133899923766, 40.771084582735476 ], [ 14.795183698394316, 40.771050177325421 ], [ 14.795183698394316, 40.771089875873898 ], [ 14.795266695845237, 40.771090537516173 ], [ 14.795271937789504, 40.771178535879855 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Residenze", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.795333093805974, 40.771878548787456 ], [ 14.795416964914271, 40.771878548787456 ], [ 14.795412159798691, 40.77144319191045 ], [ 14.795350566953534, 40.77144153781353 ], [ 14.795437495862654, 40.771375704722793 ], [ 14.795382892276523, 40.771336667984905 ], [ 14.795357119383871, 40.771365449310814 ], [ 14.795281984849352, 40.771365780130587 ], [ 14.79528668075776, 40.771684896379895 ], [ 14.795323374367641, 40.771684896379895 ], [ 14.795333093805974, 40.771878548787456 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Residenze", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.795340847515199, 40.771983293704572 ], [ 14.795322500710261, 40.771688204561578 ], [ 14.795015846970545, 40.771698129105616 ], [ 14.794791317024369, 40.771993879837815 ], [ 14.795153011178908, 40.771903236017302 ], [ 14.795340847515199, 40.771983293704572 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Presidio Sanitario e Poste", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.789438855097361, 40.769186179715007 ], [ 14.789692434151355, 40.769185600761432 ], [ 14.789694181466112, 40.769071133268532 ], [ 14.78944082082646, 40.769067824956558 ], [ 14.789438855097361, 40.769186179715007 ] ] ] ] } },
        { "type": "Feature", "properties": { "id": null, "Nome": "Unicredit Bank", "Tipologia": null, "Note": null, "Area": null, "Area2": null }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 14.7894390735117, 40.769253751834079 ], [ 14.789435578882193, 40.769390715428877 ], [ 14.789657487856228, 40.769395347043087 ], [ 14.789659235170989, 40.769255075155179 ], [ 14.789595458182385, 40.769254413494629 ], [ 14.789593710867631, 40.769335797692868 ], [ 14.789508966101954, 40.769337121012349 ], [ 14.789511587074088, 40.769255736815722 ], [ 14.7894390735117, 40.769253751834079 ] ] ] ] } }
    ]
}

var strade = {
    "type": "FeatureCollection",
    "name": "percorsoPiedi",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 14.791249047114448, 40.770745200075019 ], [ 14.790057169223713, 40.772339528334101 ] ] ] } },
        { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "MultiLineString", "coordinates": [ [ [ 14.791249627386058, 40.770740366055762 ], [ 14.791493341463037, 40.770842319842117 ], [ 14.791463167339222, 40.77088450757001 ], [ 14.791672065119485, 40.770975914221914 ], [ 14.791600111439616, 40.771072594197683 ], [ 14.791618680131197, 40.771081383279416 ], [ 14.791795082701199, 40.770842319842117 ], [ 14.79206664981554, 40.77095306257074 ], [ 14.791880962899748, 40.771188609982907 ], [ 14.791535121019091, 40.771701889511142 ], [ 14.791690633811067, 40.771761654677952 ] ] ] } }
    ]
}


const Routing = () => {

            const instance =L.Routing.control({

                language: 'it',
                formatter:  new L.Routing.Formatter({
                    language: 'it'
                }),
                waypoints: [
                    L.latLng(40.7690, 14.792),
                    L.latLng(40.7715, 14.792)
                ],
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'https://api.openrouteservice.org/v2/directions/driving-car',
                    apiKey: '5b3ce3597851110001cf62482f01d69eefba465facda2fc15008603c',
                }),
            });
    return instance;
};
const RoutingMachine = createControlComponent(Routing);
function SimpleMap(){
    const mapRef = useRef(null);
    const latitude = 40.7738;
    const longitude = 14.8003;
    const position = [40.7738, 14.8003]


    return (

        <div style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="SimpleMap">
        <MapContainer center={[latitude, longitude]}
        zoom={13} ref={mapRef} style={{height: "50vh", width: "50vw"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             <GeoJSON data={myGeo} />
            <GeoJSON data={strade} style={(feature)=>({color: 'green'})} />
            <RoutingMachine />
            <Marker position={position}></Marker>

        </MapContainer>
        </div>
    );
}

export default SimpleMap;
