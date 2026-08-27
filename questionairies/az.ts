import { Questionnaire } from "@/types";
import { ocd } from "./ocd/az";
import { scl90 } from "./scl90/az";
import { sds } from "./sds/az";
import { gad7 } from "./gad7/az";
import { phq9 } from "./phq9/az";
import { pss10 } from "./pss10/az";
import { dass21 } from "./dass21/az";
import { bdi2 } from "./bdi2/az";
import { isi } from "./isi/az";
import { adhd } from "./adhd/az";
import { gd } from "./gd/az";
import { npd } from "./npd/az";

export const questionnairesAz: Questionnaire[] = [
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
