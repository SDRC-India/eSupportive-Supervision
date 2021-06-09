package org.sdrc.ess.model.mobile;

import java.util.List;

/**
 * This domain class will let us keep Facility level data in database
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 10:09:02 am
 * @since 1.0.0
 */
public class CommunityDataModel {

	private Integer facilityId;
	private Integer facilityType;
	private Integer q1;
	private Integer q2;
	private Integer q3;
	private String q4;
	private String q5;
	private String q5a;
	private String q5b;
	private Integer q6;
	private String q7;
	private String q7_a;
	private String date;
	private Integer q1p1;
	private Integer q11a;
	private Integer q11b;
	private Integer q11c;
	private Integer q11d;
	private Integer q11e;
	private Integer q1p2;
	private Integer q1p3;
	private Integer q1p4;
	private Integer q1p5;
	private Integer note11;
	private Integer q21;
	private Integer q22;
	private Integer q23;
	private Integer q24;
	private Integer q25;
	private Integer q251;
	private Integer q26;
	private Integer q27;
	private Integer note21;
	private Integer q31;
	private Integer q31a;
	private Integer q31b;
	private Integer q31c;
	private Integer q31d;
	private Integer q311;
	private Integer q32;
	private Integer q321;
	private Integer q33;
	private Integer q331;
	private Integer q34;
	private Integer q35;
	private Integer q36;
	private Integer cal3;
	private Integer q37a;
	private Integer q37b;
	private Integer q37c;
	private Integer q37d;
	private Integer q37e;
	private Integer q37fi;
	private Integer q37fii;
	private Integer q37gi;
	private Integer q37gii;
	private Integer q37h;
	private Integer q37i;
	private Integer q37j;
	private Integer q37k;
	private Integer q37l;
	private Integer cal3a;
	private Integer note31b;
	private Integer q411;
	private Integer q412;
	private Integer q413;
	private Integer cal4;
	private Integer q421;
	private Integer q422;
	private Integer q423a;
	private Integer q423b;
	private Integer q423c;
	private Integer q423d;
	private Integer q423e;
	private Integer q423I;
	private Integer cal4a;
	private Integer q424a;
	private Integer q424b;
	private Integer q424c;
	private Integer q424d;
	private Integer q424e;
	private Integer q424f;
	private Integer q424g;
	private Integer q424h;
	private Integer q424i;
	private Integer q424j;
	private Integer cal4b;
	private Integer q431;
	private Integer q431a;
	private Integer q431b;
	private Integer q432;
	private Integer q433;
	private Integer q434;
	private Integer q435;
	private Integer q436;
	private Integer q437;
	private Integer q437a;
	private Integer q437b;
	private Integer q437c;
	private Integer q437d;
	private Integer q437e;
	private String q437eI;
	private Integer cal4c;
	private Integer q441;
	private Integer q442;
	private Integer q443;
	private Integer q444;
	private Integer q445;
	private Integer cal4d;
	private Integer q446a;
	private Integer q446b;
	private Integer q446c;
	private Integer cal4e;
	private Integer q447;
	private Integer cal4f;
	private Integer q451;
	private Integer q452;
	private Integer q453;
	private Integer cal4g;
	private Integer q461a;
	private Integer q461b;
	private Integer q461c;
	private Integer q461d;
	private Integer q461e;
	private String q461eI;
	private Integer cal4h;
	private Integer q462a;
	private Integer q462b;
	private Integer q462c;
	private Integer cal4i;
	private Integer q463;
	private Integer cal4j;
	private Integer q471;
	private Integer q471a;
	private Integer q472;
	private Integer q473;
	private Integer q474;
	private Integer q474a;
	private Integer cal4k;
	private Integer q475;
	private Integer q476;
	private Integer cal4l;
	private Integer note41a;
	private Integer note51a;
	private List<PlanOfActionModel> planOfAction;
	private List<PlanOfActionModel> lastVisitPlanOfAction;
	// private String q8;
	// private String q9;
	// private Integer q10;
	// private String q11;
	// private String q12;
	// private String q13;
	// private Integer q14;
	// private String q15;
	private String img;
	private String geopoint;
	private String img1;
	private String img2;
	private String img3;
	private String deviceid;
	private String f_img;
	private String s_img;
	private Integer c_VHNDA_score;
	private Integer c_IWANM_score;
	private Integer c_IA_IASHA_score;
	private Integer c_IA_AOECWASA_score;
	private Integer c_IA_AIWA_score;
	private Integer c_IA_AISA_score;
	private Integer c_IB_IWPW_score;
	private Integer c_IB_IWLMWMB_score;
	private Integer c_IB_AASSRFWSD_score;
	private Integer c_IB_IMWCM_score;
	private Integer c_IB_IWBMPWPM_score;
	private Integer c_IB_IWFHA_score;
	private Integer c_IB_IHHD_score;
	private Integer c_IB_SAIWWNTA_score;
	private Integer c_IA_IASHA_other_score;
	private Integer c_IB_IWLMWMB_other_score;
	private Integer c_IB_IMWCM_other_score;
	private Integer c_IB_IWBMPWPM_other_score;
	private Integer c_VHNDA_other_score;

	/*
	 * @author - Naseem Akhtar
	 * 
	 * These variables are declared to store the max score of a checklist and
	 * its subsection because the max scores depend upon the response of some
	 * questions hence max scores cannot be predefined.
	 */

	private Integer note1;
	private Integer note2;
	private Integer note3b;
	private Integer note4a;
	private Integer note5a;
	private Integer c_IA_IASHA_score_max;
	private Integer c_IA_AOECWASA_score_max;
	private Integer c_IA_AIWA_score_max;
	private Integer c_IA_AISA_score_max;
	private Integer c_IB_IWPW_score_max;
	private Integer c_IB_IWLMWMB_score_max;
	private Integer c_IB_AASSRFWSD_score_max;
	private Integer c_IB_IMWCM_score_max;
	private Integer c_IB_IWBMPWPM_score_max;
	private Integer c_IB_IWFHA_score_max;
	private Integer c_IB_IHHD_score_max;
	private Integer c_IB_SAIWWNTA_score_max;

	private Integer userId;

	public Integer getC_IA_IASHA_other_score() {
		return c_IA_IASHA_other_score;
	}

	public void setC_IA_IASHA_other_score(Integer c_IA_IASHA_other_score) {
		this.c_IA_IASHA_other_score = c_IA_IASHA_other_score;
	}

	public Integer getC_IB_IWLMWMB_other_score() {
		return c_IB_IWLMWMB_other_score;
	}

	public void setC_IB_IWLMWMB_other_score(Integer c_IB_IWLMWMB_other_score) {
		this.c_IB_IWLMWMB_other_score = c_IB_IWLMWMB_other_score;
	}

	public Integer getC_IB_IMWCM_other_score() {
		return c_IB_IMWCM_other_score;
	}

	public void setC_IB_IMWCM_other_score(Integer c_IB_IMWCM_other_score) {
		this.c_IB_IMWCM_other_score = c_IB_IMWCM_other_score;
	}

	public Integer getC_IB_IWBMPWPM_other_score() {
		return c_IB_IWBMPWPM_other_score;
	}

	public void setC_IB_IWBMPWPM_other_score(Integer c_IB_IWBMPWPM_other_score) {
		this.c_IB_IWBMPWPM_other_score = c_IB_IWBMPWPM_other_score;
	}

	public Integer getFacilityId() {
		return facilityId;
	}

	public void setFacilityId(Integer facilityId) {
		this.facilityId = facilityId;
	}

	public Integer getFacilityType() {
		return facilityType;
	}

	public void setFacilityType(Integer facilityType) {
		this.facilityType = facilityType;
	}

	public Integer getQ1() {
		return q1;
	}

	public void setQ1(Integer q1) {
		this.q1 = q1;
	}

	public Integer getQ2() {
		return q2;
	}

	public void setQ2(Integer q2) {
		this.q2 = q2;
	}

	public Integer getQ3() {
		return q3;
	}

	public void setQ3(Integer q3) {
		this.q3 = q3;
	}

	public String getQ4() {
		return q4;
	}

	public void setQ4(String q4) {
		this.q4 = q4;
	}

	public String getQ5() {
		return q5;
	}

	public void setQ5(String q5) {
		this.q5 = q5;
	}

	public String getQ5a() {
		return q5a;
	}

	public void setQ5a(String q5a) {
		this.q5a = q5a;
	}

	public String getQ5b() {
		return q5b;
	}

	public void setQ5b(String q5b) {
		this.q5b = q5b;
	}

	public Integer getQ6() {
		return q6;
	}

	public void setQ6(Integer q6) {
		this.q6 = q6;
	}

	public String getQ7() {
		return q7;
	}

	public void setQ7(String q7) {
		this.q7 = q7;
	}

	public String getQ7_a() {
		return q7_a;
	}

	public void setQ7_a(String q7_a) {
		this.q7_a = q7_a;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getQ1p1() {
		return q1p1;
	}

	public void setQ1p1(Integer q1p1) {
		this.q1p1 = q1p1;
	}

	public Integer getQ11a() {
		return q11a;
	}

	public void setQ11a(Integer q11a) {
		this.q11a = q11a;
	}

	public Integer getQ11b() {
		return q11b;
	}

	public void setQ11b(Integer q11b) {
		this.q11b = q11b;
	}

	public Integer getQ11c() {
		return q11c;
	}

	public void setQ11c(Integer q11c) {
		this.q11c = q11c;
	}

	public Integer getQ11d() {
		return q11d;
	}

	public void setQ11d(Integer q11d) {
		this.q11d = q11d;
	}

	public Integer getQ11e() {
		return q11e;
	}

	public void setQ11e(Integer q11e) {
		this.q11e = q11e;
	}

	public Integer getQ1p2() {
		return q1p2;
	}

	public void setQ1p2(Integer q1p2) {
		this.q1p2 = q1p2;
	}

	public Integer getQ1p3() {
		return q1p3;
	}

	public void setQ1p3(Integer q1p3) {
		this.q1p3 = q1p3;
	}

	public Integer getQ1p4() {
		return q1p4;
	}

	public void setQ1p4(Integer q1p4) {
		this.q1p4 = q1p4;
	}

	public Integer getQ1p5() {
		return q1p5;
	}

	public void setQ1p5(Integer q1p5) {
		this.q1p5 = q1p5;
	}

	public Integer getNote11() {
		return note11;
	}

	public void setNote11(Integer note11) {
		this.note11 = note11;
	}

	public Integer getQ21() {
		return q21;
	}

	public void setQ21(Integer q21) {
		this.q21 = q21;
	}

	public Integer getQ22() {
		return q22;
	}

	public void setQ22(Integer q22) {
		this.q22 = q22;
	}

	public Integer getQ23() {
		return q23;
	}

	public void setQ23(Integer q23) {
		this.q23 = q23;
	}

	public Integer getQ24() {
		return q24;
	}

	public void setQ24(Integer q24) {
		this.q24 = q24;
	}

	public Integer getQ25() {
		return q25;
	}

	public void setQ25(Integer q25) {
		this.q25 = q25;
	}

	public Integer getQ251() {
		return q251;
	}

	public void setQ251(Integer q251) {
		this.q251 = q251;
	}

	public Integer getQ26() {
		return q26;
	}

	public void setQ26(Integer q26) {
		this.q26 = q26;
	}

	public Integer getQ27() {
		return q27;
	}

	public void setQ27(Integer q27) {
		this.q27 = q27;
	}

	public Integer getNote21() {
		return note21;
	}

	public void setNote21(Integer note21) {
		this.note21 = note21;
	}

	public Integer getQ31a() {
		return q31a;
	}

	public void setQ31a(Integer q31a) {
		this.q31a = q31a;
	}

	public Integer getQ31b() {
		return q31b;
	}

	public void setQ31b(Integer q31b) {
		this.q31b = q31b;
	}

	public Integer getQ31c() {
		return q31c;
	}

	public void setQ31c(Integer q31c) {
		this.q31c = q31c;
	}

	public Integer getQ31d() {
		return q31d;
	}

	public void setQ31d(Integer q31d) {
		this.q31d = q31d;
	}

	public Integer getQ311() {
		return q311;
	}

	public void setQ311(Integer q311) {
		this.q311 = q311;
	}

	public Integer getQ32() {
		return q32;
	}

	public void setQ32(Integer q32) {
		this.q32 = q32;
	}

	public Integer getQ321() {
		return q321;
	}

	public void setQ321(Integer q321) {
		this.q321 = q321;
	}

	public Integer getQ33() {
		return q33;
	}

	public void setQ33(Integer q33) {
		this.q33 = q33;
	}

	public Integer getQ331() {
		return q331;
	}

	public void setQ331(Integer q331) {
		this.q331 = q331;
	}

	public Integer getQ34() {
		return q34;
	}

	public void setQ34(Integer q34) {
		this.q34 = q34;
	}

	public Integer getQ35() {
		return q35;
	}

	public void setQ35(Integer q35) {
		this.q35 = q35;
	}

	public Integer getQ36() {
		return q36;
	}

	public void setQ36(Integer q36) {
		this.q36 = q36;
	}

	public Integer getCal3() {
		return cal3;
	}

	public void setCal3(Integer cal3) {
		this.cal3 = cal3;
	}

	public Integer getQ37a() {
		return q37a;
	}

	public void setQ37a(Integer q37a) {
		this.q37a = q37a;
	}

	public Integer getQ37b() {
		return q37b;
	}

	public void setQ37b(Integer q37b) {
		this.q37b = q37b;
	}

	public Integer getQ37c() {
		return q37c;
	}

	public void setQ37c(Integer q37c) {
		this.q37c = q37c;
	}

	public Integer getQ37d() {
		return q37d;
	}

	public void setQ37d(Integer q37d) {
		this.q37d = q37d;
	}

	public Integer getQ37e() {
		return q37e;
	}

	public void setQ37e(Integer q37e) {
		this.q37e = q37e;
	}

	public Integer getQ37fi() {
		return q37fi;
	}

	public void setQ37fi(Integer q37fi) {
		this.q37fi = q37fi;
	}

	public Integer getQ37fii() {
		return q37fii;
	}

	public void setQ37fii(Integer q37fii) {
		this.q37fii = q37fii;
	}

	public Integer getQ37gi() {
		return q37gi;
	}

	public void setQ37gi(Integer q37gi) {
		this.q37gi = q37gi;
	}

	public Integer getQ37gii() {
		return q37gii;
	}

	public void setQ37gii(Integer q37gii) {
		this.q37gii = q37gii;
	}

	public Integer getQ37h() {
		return q37h;
	}

	public void setQ37h(Integer q37h) {
		this.q37h = q37h;
	}

	public Integer getQ37i() {
		return q37i;
	}

	public void setQ37i(Integer q37i) {
		this.q37i = q37i;
	}

	public Integer getQ37j() {
		return q37j;
	}

	public void setQ37j(Integer q37j) {
		this.q37j = q37j;
	}

	public Integer getQ37k() {
		return q37k;
	}

	public void setQ37k(Integer q37k) {
		this.q37k = q37k;
	}

	public Integer getQ37l() {
		return q37l;
	}

	public void setQ37l(Integer q37l) {
		this.q37l = q37l;
	}

	public Integer getCal3a() {
		return cal3a;
	}

	public void setCal3a(Integer cal3a) {
		this.cal3a = cal3a;
	}

	public Integer getNote31b() {
		return note31b;
	}

	public void setNote31b(Integer note31b) {
		this.note31b = note31b;
	}

	public Integer getQ411() {
		return q411;
	}

	public void setQ411(Integer q411) {
		this.q411 = q411;
	}

	public Integer getQ412() {
		return q412;
	}

	public void setQ412(Integer q412) {
		this.q412 = q412;
	}

	public Integer getQ413() {
		return q413;
	}

	public void setQ413(Integer q413) {
		this.q413 = q413;
	}

	public Integer getCal4() {
		return cal4;
	}

	public void setCal4(Integer cal4) {
		this.cal4 = cal4;
	}

	public Integer getQ421() {
		return q421;
	}

	public void setQ421(Integer q421) {
		this.q421 = q421;
	}

	public Integer getQ422() {
		return q422;
	}

	public void setQ422(Integer q422) {
		this.q422 = q422;
	}

	public Integer getQ423a() {
		return q423a;
	}

	public void setQ423a(Integer q423a) {
		this.q423a = q423a;
	}

	public Integer getQ423b() {
		return q423b;
	}

	public void setQ423b(Integer q423b) {
		this.q423b = q423b;
	}

	public Integer getQ423c() {
		return q423c;
	}

	public void setQ423c(Integer q423c) {
		this.q423c = q423c;
	}

	public Integer getQ423d() {
		return q423d;
	}

	public void setQ423d(Integer q423d) {
		this.q423d = q423d;
	}

	public Integer getQ423e() {
		return q423e;
	}

	public void setQ423e(Integer q423e) {
		this.q423e = q423e;
	}

	public Integer getQ423I() {
		return q423I;
	}

	public void setQ423I(Integer q423i) {
		q423I = q423i;
	}

	public Integer getCal4a() {
		return cal4a;
	}

	public void setCal4a(Integer cal4a) {
		this.cal4a = cal4a;
	}

	public Integer getQ424a() {
		return q424a;
	}

	public void setQ424a(Integer q424a) {
		this.q424a = q424a;
	}

	public Integer getQ424b() {
		return q424b;
	}

	public void setQ424b(Integer q424b) {
		this.q424b = q424b;
	}

	public Integer getQ424c() {
		return q424c;
	}

	public void setQ424c(Integer q424c) {
		this.q424c = q424c;
	}

	public Integer getQ424d() {
		return q424d;
	}

	public void setQ424d(Integer q424d) {
		this.q424d = q424d;
	}

	public Integer getQ424e() {
		return q424e;
	}

	public void setQ424e(Integer q424e) {
		this.q424e = q424e;
	}

	public Integer getQ424f() {
		return q424f;
	}

	public void setQ424f(Integer q424f) {
		this.q424f = q424f;
	}

	public Integer getQ424g() {
		return q424g;
	}

	public void setQ424g(Integer q424g) {
		this.q424g = q424g;
	}

	public Integer getQ424h() {
		return q424h;
	}

	public void setQ424h(Integer q424h) {
		this.q424h = q424h;
	}

	public Integer getQ424i() {
		return q424i;
	}

	public void setQ424i(Integer q424i) {
		this.q424i = q424i;
	}

	public Integer getQ424j() {
		return q424j;
	}

	public void setQ424j(Integer q424j) {
		this.q424j = q424j;
	}

	public Integer getCal4b() {
		return cal4b;
	}

	public void setCal4b(Integer cal4b) {
		this.cal4b = cal4b;
	}

	public Integer getQ431() {
		return q431;
	}

	public void setQ431(Integer q431) {
		this.q431 = q431;
	}

	public Integer getQ431a() {
		return q431a;
	}

	public void setQ431a(Integer q431a) {
		this.q431a = q431a;
	}

	public Integer getQ431b() {
		return q431b;
	}

	public void setQ431b(Integer q431b) {
		this.q431b = q431b;
	}

	public Integer getQ432() {
		return q432;
	}

	public void setQ432(Integer q432) {
		this.q432 = q432;
	}

	public Integer getQ433() {
		return q433;
	}

	public void setQ433(Integer q433) {
		this.q433 = q433;
	}

	public Integer getQ434() {
		return q434;
	}

	public void setQ434(Integer q434) {
		this.q434 = q434;
	}

	public Integer getQ435() {
		return q435;
	}

	public void setQ435(Integer q435) {
		this.q435 = q435;
	}

	public Integer getQ436() {
		return q436;
	}

	public void setQ436(Integer q436) {
		this.q436 = q436;
	}

	public Integer getQ437() {
		return q437;
	}

	public void setQ437(Integer q437) {
		this.q437 = q437;
	}

	public Integer getQ437a() {
		return q437a;
	}

	public void setQ437a(Integer q437a) {
		this.q437a = q437a;
	}

	public Integer getQ437b() {
		return q437b;
	}

	public void setQ437b(Integer q437b) {
		this.q437b = q437b;
	}

	public Integer getQ437c() {
		return q437c;
	}

	public void setQ437c(Integer q437c) {
		this.q437c = q437c;
	}

	public Integer getQ437d() {
		return q437d;
	}

	public void setQ437d(Integer q437d) {
		this.q437d = q437d;
	}

	public Integer getQ437e() {
		return q437e;
	}

	public void setQ437e(Integer q437e) {
		this.q437e = q437e;
	}

	public String getQ437eI() {
		return q437eI;
	}

	public void setQ437eI(String q437eI) {
		this.q437eI = q437eI;
	}

	public Integer getCal4c() {
		return cal4c;
	}

	public void setCal4c(Integer cal4c) {
		this.cal4c = cal4c;
	}

	public Integer getQ441() {
		return q441;
	}

	public void setQ441(Integer q441) {
		this.q441 = q441;
	}

	public Integer getQ442() {
		return q442;
	}

	public void setQ442(Integer q442) {
		this.q442 = q442;
	}

	public Integer getQ443() {
		return q443;
	}

	public void setQ443(Integer q443) {
		this.q443 = q443;
	}

	public Integer getQ444() {
		return q444;
	}

	public void setQ444(Integer q444) {
		this.q444 = q444;
	}

	public Integer getQ445() {
		return q445;
	}

	public void setQ445(Integer q445) {
		this.q445 = q445;
	}

	public Integer getCal4d() {
		return cal4d;
	}

	public void setCal4d(Integer cal4d) {
		this.cal4d = cal4d;
	}

	public Integer getQ446a() {
		return q446a;
	}

	public void setQ446a(Integer q446a) {
		this.q446a = q446a;
	}

	public Integer getQ446b() {
		return q446b;
	}

	public void setQ446b(Integer q446b) {
		this.q446b = q446b;
	}

	public Integer getQ446c() {
		return q446c;
	}

	public void setQ446c(Integer q446c) {
		this.q446c = q446c;
	}

	public Integer getCal4e() {
		return cal4e;
	}

	public void setCal4e(Integer cal4e) {
		this.cal4e = cal4e;
	}

	public Integer getQ447() {
		return q447;
	}

	public void setQ447(Integer q447) {
		this.q447 = q447;
	}

	public Integer getCal4f() {
		return cal4f;
	}

	public void setCal4f(Integer cal4f) {
		this.cal4f = cal4f;
	}

	public Integer getQ451() {
		return q451;
	}

	public void setQ451(Integer q451) {
		this.q451 = q451;
	}

	public Integer getQ452() {
		return q452;
	}

	public void setQ452(Integer q452) {
		this.q452 = q452;
	}

	public Integer getQ453() {
		return q453;
	}

	public void setQ453(Integer q453) {
		this.q453 = q453;
	}

	public Integer getCal4g() {
		return cal4g;
	}

	public void setCal4g(Integer cal4g) {
		this.cal4g = cal4g;
	}

	public Integer getQ461a() {
		return q461a;
	}

	public void setQ461a(Integer q461a) {
		this.q461a = q461a;
	}

	public Integer getQ461b() {
		return q461b;
	}

	public void setQ461b(Integer q461b) {
		this.q461b = q461b;
	}

	public Integer getQ461c() {
		return q461c;
	}

	public void setQ461c(Integer q461c) {
		this.q461c = q461c;
	}

	public Integer getQ461d() {
		return q461d;
	}

	public void setQ461d(Integer q461d) {
		this.q461d = q461d;
	}

	public Integer getQ461e() {
		return q461e;
	}

	public void setQ461e(Integer q461e) {
		this.q461e = q461e;
	}

	public String getQ461eI() {
		return q461eI;
	}

	public void setQ461eI(String q461eI) {
		this.q461eI = q461eI;
	}

	public Integer getCal4h() {
		return cal4h;
	}

	public void setCal4h(Integer cal4h) {
		this.cal4h = cal4h;
	}

	public Integer getQ462a() {
		return q462a;
	}

	public void setQ462a(Integer q462a) {
		this.q462a = q462a;
	}

	public Integer getQ462b() {
		return q462b;
	}

	public void setQ462b(Integer q462b) {
		this.q462b = q462b;
	}

	public Integer getQ462c() {
		return q462c;
	}

	public void setQ462c(Integer q462c) {
		this.q462c = q462c;
	}

	public Integer getCal4i() {
		return cal4i;
	}

	public void setCal4i(Integer cal4i) {
		this.cal4i = cal4i;
	}

	public Integer getQ463() {
		return q463;
	}

	public void setQ463(Integer q463) {
		this.q463 = q463;
	}

	public Integer getCal4j() {
		return cal4j;
	}

	public void setCal4j(Integer cal4j) {
		this.cal4j = cal4j;
	}

	public Integer getQ471() {
		return q471;
	}

	public void setQ471(Integer q471) {
		this.q471 = q471;
	}

	public Integer getQ471a() {
		return q471a;
	}

	public void setQ471a(Integer q471a) {
		this.q471a = q471a;
	}

	public Integer getQ472() {
		return q472;
	}

	public void setQ472(Integer q472) {
		this.q472 = q472;
	}

	public Integer getQ473() {
		return q473;
	}

	public void setQ473(Integer q473) {
		this.q473 = q473;
	}

	public Integer getQ474() {
		return q474;
	}

	public void setQ474(Integer q474) {
		this.q474 = q474;
	}

	public Integer getQ474a() {
		return q474a;
	}

	public void setQ474a(Integer q474a) {
		this.q474a = q474a;
	}

	public Integer getCal4k() {
		return cal4k;
	}

	public void setCal4k(Integer cal4k) {
		this.cal4k = cal4k;
	}

	public Integer getQ475() {
		return q475;
	}

	public void setQ475(Integer q475) {
		this.q475 = q475;
	}

	public Integer getQ476() {
		return q476;
	}

	public void setQ476(Integer q476) {
		this.q476 = q476;
	}

	public Integer getCal4l() {
		return cal4l;
	}

	public void setCal4l(Integer cal4l) {
		this.cal4l = cal4l;
	}

	public Integer getNote41a() {
		return note41a;
	}

	public void setNote41a(Integer note41a) {
		this.note41a = note41a;
	}

	public Integer getNote51a() {
		return note51a;
	}

	public void setNote51a(Integer note51a) {
		this.note51a = note51a;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getGeopoint() {
		return geopoint;
	}

	public void setGeopoint(String geopoint) {
		this.geopoint = geopoint;
	}

	public String getImg1() {
		return img1;
	}

	public void setImg1(String img1) {
		this.img1 = img1;
	}

	public String getImg2() {
		return img2;
	}

	public void setImg2(String img2) {
		this.img2 = img2;
	}
	
	public String getImg3() {
		return img3;
	}

	public void setImg3(String img3) {
		this.img3 = img3;
	}

	public String getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}

	public String getF_img() {
		return f_img;
	}

	public void setF_img(String f_img) {
		this.f_img = f_img;
	}

	public String getS_img() {
		return s_img;
	}

	public void setS_img(String s_img) {
		this.s_img = s_img;
	}

	public Integer getC_VHNDA_score() {
		return c_VHNDA_score;
	}

	public void setC_VHNDA_score(Integer c_VHNDA_score) {
		this.c_VHNDA_score = c_VHNDA_score;
	}

	public Integer getC_IWANM_score() {
		return c_IWANM_score;
	}

	public void setC_IWANM_score(Integer c_IWANM_score) {
		this.c_IWANM_score = c_IWANM_score;
	}

	public Integer getC_IA_IASHA_score() {
		return c_IA_IASHA_score;
	}

	public void setC_IA_IASHA_score(Integer c_IA_IASHA_score) {
		this.c_IA_IASHA_score = c_IA_IASHA_score;
	}

	public Integer getC_IA_AOECWASA_score() {
		return c_IA_AOECWASA_score;
	}

	public void setC_IA_AOECWASA_score(Integer c_IA_AOECWASA_score) {
		this.c_IA_AOECWASA_score = c_IA_AOECWASA_score;
	}

	public Integer getC_IA_AIWA_score() {
		return c_IA_AIWA_score;
	}

	public void setC_IA_AIWA_score(Integer c_IA_AIWA_score) {
		this.c_IA_AIWA_score = c_IA_AIWA_score;
	}

	public Integer getC_IA_AISA_score() {
		return c_IA_AISA_score;
	}

	public void setC_IA_AISA_score(Integer c_IA_AISA_score) {
		this.c_IA_AISA_score = c_IA_AISA_score;
	}

	public Integer getC_IB_IWPW_score() {
		return c_IB_IWPW_score;
	}

	public void setC_IB_IWPW_score(Integer c_IB_IWPW_score) {
		this.c_IB_IWPW_score = c_IB_IWPW_score;
	}

	public Integer getC_IB_IWLMWMB_score() {
		return c_IB_IWLMWMB_score;
	}

	public void setC_IB_IWLMWMB_score(Integer c_IB_IWLMWMB_score) {
		this.c_IB_IWLMWMB_score = c_IB_IWLMWMB_score;
	}

	public Integer getC_IB_AASSRFWSD_score() {
		return c_IB_AASSRFWSD_score;
	}

	public void setC_IB_AASSRFWSD_score(Integer c_IB_AASSRFWSD_score) {
		this.c_IB_AASSRFWSD_score = c_IB_AASSRFWSD_score;
	}

	public Integer getC_IB_IMWCM_score() {
		return c_IB_IMWCM_score;
	}

	public void setC_IB_IMWCM_score(Integer c_IB_IMWCM_score) {
		this.c_IB_IMWCM_score = c_IB_IMWCM_score;
	}

	public Integer getC_IB_IWBMPWPM_score() {
		return c_IB_IWBMPWPM_score;
	}

	public void setC_IB_IWBMPWPM_score(Integer c_IB_IWBMPWPM_score) {
		this.c_IB_IWBMPWPM_score = c_IB_IWBMPWPM_score;
	}

	public Integer getC_IB_IWFHA_score() {
		return c_IB_IWFHA_score;
	}

	public void setC_IB_IWFHA_score(Integer c_IB_IWFHA_score) {
		this.c_IB_IWFHA_score = c_IB_IWFHA_score;
	}

	public Integer getC_IB_IHHD_score() {
		return c_IB_IHHD_score;
	}

	public void setC_IB_IHHD_score(Integer c_IB_IHHD_score) {
		this.c_IB_IHHD_score = c_IB_IHHD_score;
	}

	public Integer getC_IB_SAIWWNTA_score() {
		return c_IB_SAIWWNTA_score;
	}

	public void setC_IB_SAIWWNTA_score(Integer c_IB_SAIWWNTA_score) {
		this.c_IB_SAIWWNTA_score = c_IB_SAIWWNTA_score;
	}

	public List<PlanOfActionModel> getPlanOfAction() {
		return planOfAction;
	}

	public void setPlanOfAction(List<PlanOfActionModel> planOfAction) {
		this.planOfAction = planOfAction;
	}

	public List<PlanOfActionModel> getLastVisitPlanOfAction() {
		return lastVisitPlanOfAction;
	}

	public void setLastVisitPlanOfAction(List<PlanOfActionModel> lastVisitPlanOfAction) {
		this.lastVisitPlanOfAction = lastVisitPlanOfAction;
	}

	public Integer getC_VHNDA_other_score() {
		return c_VHNDA_other_score;
	}

	public void setC_VHNDA_other_score(Integer c_VHNDA_other_score) {
		this.c_VHNDA_other_score = c_VHNDA_other_score;
	}

	public Integer getNote1() {
		return note1;
	}

	public void setNote1(Integer note1) {
		this.note1 = note1;
	}

	public Integer getNote2() {
		return note2;
	}

	public void setNote2(Integer note2) {
		this.note2 = note2;
	}

	public Integer getNote3b() {
		return note3b;
	}

	public void setNote3b(Integer note3b) {
		this.note3b = note3b;
	}

	public Integer getNote4a() {
		return note4a;
	}

	public void setNote4a(Integer note4a) {
		this.note4a = note4a;
	}

	public Integer getNote5a() {
		return note5a;
	}

	public void setNote5a(Integer note5a) {
		this.note5a = note5a;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getC_IA_IASHA_score_max() {
		return c_IA_IASHA_score_max;
	}

	public void setC_IA_IASHA_score_max(Integer c_IA_IASHA_score_max) {
		this.c_IA_IASHA_score_max = c_IA_IASHA_score_max;
	}

	public Integer getC_IA_AOECWASA_score_max() {
		return c_IA_AOECWASA_score_max;
	}

	public void setC_IA_AOECWASA_score_max(Integer c_IA_AOECWASA_score_max) {
		this.c_IA_AOECWASA_score_max = c_IA_AOECWASA_score_max;
	}

	public Integer getC_IA_AIWA_score_max() {
		return c_IA_AIWA_score_max;
	}

	public void setC_IA_AIWA_score_max(Integer c_IA_AIWA_score_max) {
		this.c_IA_AIWA_score_max = c_IA_AIWA_score_max;
	}

	public Integer getC_IA_AISA_score_max() {
		return c_IA_AISA_score_max;
	}

	public void setC_IA_AISA_score_max(Integer c_IA_AISA_score_max) {
		this.c_IA_AISA_score_max = c_IA_AISA_score_max;
	}

	public Integer getC_IB_IWPW_score_max() {
		return c_IB_IWPW_score_max;
	}

	public void setC_IB_IWPW_score_max(Integer c_IB_IWPW_score_max) {
		this.c_IB_IWPW_score_max = c_IB_IWPW_score_max;
	}

	public Integer getC_IB_IWLMWMB_score_max() {
		return c_IB_IWLMWMB_score_max;
	}

	public void setC_IB_IWLMWMB_score_max(Integer c_IB_IWLMWMB_score_max) {
		this.c_IB_IWLMWMB_score_max = c_IB_IWLMWMB_score_max;
	}

	public Integer getC_IB_AASSRFWSD_score_max() {
		return c_IB_AASSRFWSD_score_max;
	}

	public void setC_IB_AASSRFWSD_score_max(Integer c_IB_AASSRFWSD_score_max) {
		this.c_IB_AASSRFWSD_score_max = c_IB_AASSRFWSD_score_max;
	}

	public Integer getC_IB_IMWCM_score_max() {
		return c_IB_IMWCM_score_max;
	}

	public void setC_IB_IMWCM_score_max(Integer c_IB_IMWCM_score_max) {
		this.c_IB_IMWCM_score_max = c_IB_IMWCM_score_max;
	}

	public Integer getC_IB_IWBMPWPM_score_max() {
		return c_IB_IWBMPWPM_score_max;
	}

	public void setC_IB_IWBMPWPM_score_max(Integer c_IB_IWBMPWPM_score_max) {
		this.c_IB_IWBMPWPM_score_max = c_IB_IWBMPWPM_score_max;
	}

	public Integer getC_IB_IWFHA_score_max() {
		return c_IB_IWFHA_score_max;
	}

	public void setC_IB_IWFHA_score_max(Integer c_IB_IWFHA_score_max) {
		this.c_IB_IWFHA_score_max = c_IB_IWFHA_score_max;
	}

	public Integer getC_IB_IHHD_score_max() {
		return c_IB_IHHD_score_max;
	}

	public void setC_IB_IHHD_score_max(Integer c_IB_IHHD_score_max) {
		this.c_IB_IHHD_score_max = c_IB_IHHD_score_max;
	}

	public Integer getC_IB_SAIWWNTA_score_max() {
		return c_IB_SAIWWNTA_score_max;
	}

	public void setC_IB_SAIWWNTA_score_max(Integer c_IB_SAIWWNTA_score_max) {
		this.c_IB_SAIWWNTA_score_max = c_IB_SAIWWNTA_score_max;
	}

	public Integer getQ31() {
		return q31;
	}

	public void setQ31(Integer q31) {
		this.q31 = q31;
	}

}
