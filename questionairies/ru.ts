import { Questionnaire } from "@/types";
import { ocd } from "./ocd/ru";
import { scl90 } from "./scl90/ru";
import { sds } from "./sds/ru";
import { gad7 } from "./gad7/ru";
import { phq9 } from "./phq9/ru";
import { pss10 } from "./pss10/ru";
import { dass21 } from "./dass21/ru";
import { bdi2 } from "./bdi2/ru";
import { isi } from "./isi/ru";
import { adhd } from "./adhd/ru";
import { gd } from "./gd/ru";
import { npd } from "./npd/ru";

export const questionnairesRu: Questionnaire[] = [
    ocd,
    scl90,
    sds,
    gad7,
    phq9,
    pss10,
    dass21,
    bdi2,
    isi,
    adhd,
    gd,
    npd
];
