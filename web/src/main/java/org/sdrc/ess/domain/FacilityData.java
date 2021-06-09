package org.sdrc.ess.domain;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * This domain class will let us keep Facility level data in database
 * 
 * @author Ratikanta Pradhan (ratikanta@sdrc.co.in) on 14-May-2017 10:09:02 am
 * @author Naseem Akhtar (naseem@sdrc.co.in) on 26th July 2017 13:26:00
 * @since 1.0.0
 */
@Entity
@Table(name = "facility_data")
public class FacilityData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_pk")
	private Long id;
	// We did not keep state because we can get it from bottom level area id
	private Integer stateName;
	private Integer district;
	private Integer block;
	private String c1;
	private String c11;
	private String c13;
	private Integer c2;
	private String c3;
	private String c31;

	@ManyToOne
	@JoinColumn(name = "facility_type_id_fk", nullable = false)
	private TypeDetail c43;

	private String c51;
	private Integer c6;
	private Date c7;
	private String c8;
	private String c9;
	private Integer d1;
	private Integer d2;
	private Integer d3;
	private Integer d41;
	private Integer d42;
	private Integer d43;
	private Integer d44;
	private Integer d51;
	private Integer d52;
	private Integer d53;
	private Integer d54;
	private Integer d55;
	private Integer d56;
	private Integer d57;
	private Integer d58;
	private Integer d61;
	private Integer d62;
	private Integer d71;
	private Integer d72;
	private Integer d73;
	private Integer d74;
	private Integer d8;
	private Integer d91;
	private Integer d92;
	private Integer d93;
	private Integer d94;
	private Integer d101;
	private Integer d102;
	private Integer d103;
	private Integer d104;
	private Integer d11;
	private Integer d121;
	private Integer d122;
	private Integer d131;
	private Integer d132;
	private Integer d133;
	private Integer d134;
	private Integer d135;
	private Integer d136;
	private Integer d137;
	private Integer d138;
	private Integer d141;
	private Integer d142;
	private Integer d143;
	private Integer d144;
	private Integer d145;
	private Integer d146;
	private Integer d151;
	private Integer d152;
	private Integer d153;
	private Integer d161;
	private Integer d162;
	private Integer d171;
	private Integer d172;
	private Integer e111;
	private Integer e112;
	private Integer e121;
	private Integer e122;
	private Integer e13;
	private Integer e14;
	private Integer e15;
	private Integer e16;
	private Integer e17;
	private Integer e21;
	private Integer e22;
	private Integer e23;
	private Integer e24;
	private Integer e25;
	private Integer e26;
	private Integer e27;
	private Integer e28;
	private Integer e29;
	private Integer e210;
	private Integer e211;
	private Integer e212;
	private Integer e213;
	private Integer e214;
	private Integer e215;
	private Integer e216;
	private Integer e217;
	private Integer e218;
	private Integer e219;
	private Integer e220;
	private Integer e221;
	private Integer e222;
	private Integer e223;
	private Integer e224;
	private Integer e225;
	private Integer e226;
	private Integer e227;
	private Integer e228;
	private Integer e229;
	private Integer e230;
	private Integer e231;
	private Integer e232;
	private Integer e233;
	private Integer e234;
	private Integer e235;
	private Integer e236;
	private Integer e31;
	private Integer e32;
	private Integer e33;
	private Integer e341;
	private Integer e342;
	private Integer e351;
	private Integer e352;
	private Integer e36;
	private Integer e37;
	private Integer e38;
	private Integer e39;
	private Integer e310;
	private Integer e311;
	private Integer e312;
	private Integer e313;
	private Integer e41;
	private Integer e42;
	private Integer e43;
	private Integer e44;
	private Integer e45;
	private Integer e46;
	private Integer e47;
	private Integer e51;
	private Integer e52;
	private Integer e53;
	private Integer e54;
	private Integer e55;
	private Integer e56;
	private Integer e57;
	private Integer e58;
	private Integer e59;
	private Integer e510;
	private Integer e511;
	private Integer e512;
	private Integer e513;
	private Integer e61;
	private Integer e62;
	private Integer e63;
	private Integer e64;
	private Integer e65;
	private Integer e66;
	private Integer e67;
	private Integer e71;
	private Integer e72;
	private Integer e73;
	private Integer e74;
	private Integer e75;
	private Integer e76;
	private Integer e77;
	private Integer e81;
	private Integer e82;
	private Integer e83;
	private Integer e84;
	private Integer e85;
	private Integer e86;
	private Integer e87;
	private Integer e88;
	private Integer e91;
	private Integer e92;
	private Integer e93;
	private Integer e94;
	private Integer e101;
	private Integer e102;
	private Integer e103;
	private Integer e104;
	private Integer e105;
	private Integer e106;
	private Integer e107;
	private Integer e108;
	private Integer e109;
	private Integer e1010;
	private Integer e1011;
	private Integer e11g1;
	private Integer e1111;
	private Integer e1112;
	private Integer e1113;
	private Integer e1114;
	private Integer e1115;
	private Integer e11g2;
	private Integer e1121;
	private Integer e1122;
	private Integer e1123;
	private Integer e1124;
	private Integer e1125;
	private Integer e11g3;
	private Integer e1131;
	private Integer e1132;
	private Integer e1133;
	private Integer e1134;
	private Integer e1135;
	private Integer e11g4;
	private Integer e1141;
	private Integer e1145; // added after jagat's request.

	private Integer note_SC_1;
	private Integer note_Non_24x7_PHC_1;
	private Integer note_24x7_PHC_1;
	private Integer note_Non_FRU_CHC_1;
	private Integer note_FRU_CHC_1;
	private Integer note_SDH_1;
	private Integer note_DH_1;
	private Integer note_Area_Hospital_1;
	private Integer note_MC_1;

	private Integer f11;
	private Integer f12;
	private Integer f13;
	private Integer f14;
	private Integer f15;
	private Integer f16;
	private Integer f17;
	private Integer f18;
	private Integer f19;
	private Integer f110;
	private Integer f111;
	private Integer f21;
	private Integer f22;
	private Integer f23;
	private Integer f24;
	private Integer f25;
	private Integer f26;
	private Integer f27;
	private Integer f28;
	private Integer f29;
	private Integer f210;
	private Integer f31;
	private Integer f32;
	private Integer f33;
	private Integer f34;
	private Integer f35;
	private Integer f36;
	private Integer f37;
	private Integer f38;
	private Integer f39;
	private Integer f310;
	private Integer f41;
	private Integer f42;
	private Integer f43;
	private Integer f44;
	private Integer f45;
	private Integer f51;
	private Integer f52;
	private Integer f53;
	private Integer f54;
	private Integer f55;
	private Integer f56;
	private Integer f57;
	private Integer f58;
	private Integer f61;
	private Integer f62;
	private Integer f63;
	private Integer f64;
	private Integer f65;
	private Integer f66;
	private Integer f71;
	private Integer f72;
	private Integer f73;
	private Integer f74;
	private Integer f75;
	private Integer f76;
	private Integer f77;
	private Integer f78;
	private Integer f79;
	private Integer f710;
	private Integer f711;

	private Integer note_SC_2;
	private Integer note_Non_24x7_PHC_2;
	private Integer note_24x7_PHC_2;
	private Integer note_Non_FRU_CHC_2;
	private Integer note_FRU_CHC_2;
	private Integer note_SDH_2;
	private Integer note_DH_2;
	private Integer note_Area_Hospital_2;
	private Integer note_MC_2;
	private Integer note_SC;
	private Integer note_Non_24x7_PHC;
	private Integer note_24x7_PHC;
	private Integer note_Non_FRU_CHC;
	private Integer note_FRU_CHC;
	private Integer note_SDH;
	private Integer note_DH;
	private Integer note_Area_Hospital;
	private Integer note_MC;

	private String major;
	private String action;
	private String f_img;
	private String s_img;
	private String geopoint;
	private String img1;
	private String img2;
	private String img3;
	private String deviceid;

	/**
	 * @author Naseem Akhtar (naseem@sdrc.co.in) on 10th October 2017 1640 hrs
	 * 
	 *         The following columns are for sub-section score secured and max
	 *         score.
	 */
	private Integer e_RH_score;
	private Integer e_MHDS_score;
	private Integer e_NHDS_score;
	private Integer e_CHDS_score;
	private Integer e_Vaccines_score;
	private Integer e_Antibiotics_score;
	private Integer e_Infrastructure_score;
	private Integer e_IP_score;
	private Integer e_AHDS_score;
	private Integer e_OE_score;
	private Integer f_ANC_score;
	private Integer f_IPIP_score;
	private Integer f_ENCR_score;
	private Integer f_FP_score;
	private Integer f_CS_score;
	private Integer f_FMO_score;
	private Integer f_AH_score;
	private Integer e_total_score;
	private Integer f_total_score;
	private Integer checklist_score;

	private Integer e_RH_score_max;
	private Integer e_MHDS_score_max;
	private Integer e_NHDS_score_max;
	private Integer e_CHDS_score_max;
	private Integer e_Vaccines_score_max;
	private Integer e_Antibiotics_score_max;
	private Integer e_Infrastructure_score_max;
	private Integer e_IP_score_max;
	private Integer e_AHDS_score_max;
	private Integer e_OE_score_max;
	private Integer f_ANC_score_max;
	private Integer f_IPIP_score_max;
	private Integer f_ENCR_score_max;
	private Integer f_FP_score_max;
	private Integer f_CS_score_max;
	private Integer f_FMO_score_max;
	private Integer f_AH_score_max;
	private Integer e_total_score_max;
	private Integer f_total_score_max;
	private Integer checklist_score_max;

	@ManyToOne
	@JoinColumn(name = "facility_id", nullable = false)
	private Area area;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private EssUser user;

	/**
	 * 
	 * @author Naseem Akhtar The following variables are added for the new
	 *         sections (Health System and NPCDCS & NTCP) as dicussed on 12th
	 *         September 2017 10:42
	 */

	private Integer hA1;
	private Integer hA2;
	private Integer hA2p1;
	private Integer hA2p2;
	private Integer hA3;
	private Integer hA3p1;
	private Integer hB1;
	private Integer hB2;
	private Integer hC1;
	private Integer hC2;
	private Integer hD1;
	private Float hE1;
	private Integer hE2p1;
	private Integer hE2p2;
	private Integer hE2p3;
	private Integer hE2p4;
	private Integer hE2p5;
	private Integer hE3p1;
	private Integer hE3p2;
	private Integer hE3p3;
	private Integer hE3p4;
	private Integer hE3p5;
	private Integer hF1;
	private Integer hF1p1;
	private Integer hF1p2;
	private Integer hF1p2p1;
	private Integer hF2;
	private Integer iA1;
	private Integer iA2;
	private Integer iB1;
	private Integer iB2;
	private Integer iB3;
	private Integer iB4;
	private Integer iB4p1;
	private Integer iC1;
	private Integer iC2;
	private Integer iC3;

	// National Vector Borne Disease Control Program (NVBCDP)
	// Malaria
	private Integer iDA1;
	private Integer iDA2;
	private Integer iDA3;
	private Integer iDA3p1;
	private Integer iDA3p2;
	private Integer iDA3p3;
	private Integer iDA3p4;
	private Integer iDA3p5;
	private Integer iDA3p6;
	private Integer iDA3p7;
	// Japanese encephalitis (JE)
	private Integer iDB1;
	private Integer iDB2;
	private Integer iDB3;
	// Dengue and chicken gunya
	private Integer iDC1;
	private Integer iDC2;
	private Integer iDC3;
	// Lymphatic Filariasis
	private Integer iDD1;
	private Integer iDD2;
	private Integer iDD3;
	// kala azar
	private Integer iDE1;
	private Integer iDE2;
	private Integer iDE3;
	private Integer iDE4;
	private Integer iDE5;
	private Integer iDE6;
	// RNTCP
	private Integer iE1;
	private Integer iE2;
	private Integer iE3;
	private Integer iE4;
	private Integer iE5;
	private Integer iE6;
	// Leprosy
	private Integer iF1;
	private Integer iF2;
	private Integer iF3;
	private Integer iF4;
	// NCD
	private Integer iG1;
	private Integer iG2;
	private Integer iG3;
	private Integer iG3p1;
	private Integer iG4;
	private Integer iG4p1;
	private Integer iG5;
	private Integer iG6;
	// NPCC
	private Integer iH1;
	private Integer iH1p1;
	private Integer iH2;

	// Variables taken for denominator of some indicators. (refer indicator
	// checklist)
	private Integer fSterilizationTotal;
	private Integer sterilizationTotal;

	// Added for identifying the records which are taken into consideration
	// while
	// aggregation
	@Column(name = "is_aggregated", columnDefinition = "boolean default FALSE")
	private Boolean isAggregated;

	@Column(name = "created_date")
	private Timestamp createdDate;
	
	/**
	 * This property will keep the data entry app(both android and web) version name by the help of which we can know
	 * from which version our data has come.
	 * 
	 *  @author Ratikanta Pradhan
	 *  @since 2.0.0
	 */
	@Column(name = "app_version_name")
	private String appVersionName;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getStateName() {
		return stateName;
	}

	public void setStateName(Integer stateName) {
		this.stateName = stateName;
	}

	public String getC1() {
		return c1;
	}

	public void setC1(String c1) {
		this.c1 = c1;
	}

	public String getC11() {
		return c11;
	}

	public void setC11(String c11) {
		this.c11 = c11;
	}

	public String getC13() {
		return c13;
	}

	public void setC13(String c13) {
		this.c13 = c13;
	}

	public Integer getC2() {
		return c2;
	}

	public void setC2(Integer c2) {
		this.c2 = c2;
	}

	public String getC3() {
		return c3;
	}

	public void setC3(String c3) {
		this.c3 = c3;
	}

	public String getC31() {
		return c31;
	}

	public void setC31(String c31) {
		this.c31 = c31;
	}

	public Integer getDistrict() {
		return district;
	}

	public void setDistrict(Integer district) {
		this.district = district;
	}

	public Integer getBlock() {
		return block;
	}

	public void setBlock(Integer block) {
		this.block = block;
	}

	public TypeDetail getC43() {
		return c43;
	}

	public void setC43(TypeDetail c43) {
		this.c43 = c43;
	}

	public String getC51() {
		return c51;
	}

	public void setC51(String c51) {
		this.c51 = c51;
	}

	public Integer getC6() {
		return c6;
	}

	public void setC6(Integer c6) {
		this.c6 = c6;
	}

	public Date getC7() {
		return c7;
	}

	public void setC7(Date c7) {
		this.c7 = c7;
	}

	public String getC8() {
		return c8;
	}

	public void setC8(String c8) {
		this.c8 = c8;
	}

	public String getC9() {
		return c9;
	}

	public void setC9(String c9) {
		this.c9 = c9;
	}

	public Integer getD1() {
		return d1;
	}

	public void setD1(Integer d1) {
		this.d1 = d1;
	}

	public Integer getD2() {
		return d2;
	}

	public void setD2(Integer d2) {
		this.d2 = d2;
	}

	public Integer getD3() {
		return d3;
	}

	public void setD3(Integer d3) {
		this.d3 = d3;
	}

	public Integer getD41() {
		return d41;
	}

	public void setD41(Integer d41) {
		this.d41 = d41;
	}

	public Integer getD42() {
		return d42;
	}

	public void setD42(Integer d42) {
		this.d42 = d42;
	}

	public Integer getD43() {
		return d43;
	}

	public void setD43(Integer d43) {
		this.d43 = d43;
	}

	public Integer getD44() {
		return d44;
	}

	public void setD44(Integer d44) {
		this.d44 = d44;
	}

	public Integer getD51() {
		return d51;
	}

	public void setD51(Integer d51) {
		this.d51 = d51;
	}

	public Integer getD52() {
		return d52;
	}

	public void setD52(Integer d52) {
		this.d52 = d52;
	}

	public Integer getD53() {
		return d53;
	}

	public void setD53(Integer d53) {
		this.d53 = d53;
	}

	public Integer getD54() {
		return d54;
	}

	public void setD54(Integer d54) {
		this.d54 = d54;
	}

	public Integer getD55() {
		return d55;
	}

	public void setD55(Integer d55) {
		this.d55 = d55;
	}

	public Integer getD56() {
		return d56;
	}

	public void setD56(Integer d56) {
		this.d56 = d56;
	}

	public Integer getD57() {
		return d57;
	}

	public void setD57(Integer d57) {
		this.d57 = d57;
	}

	public Integer getD58() {
		return d58;
	}

	public void setD58(Integer d58) {
		this.d58 = d58;
	}

	public Integer getD61() {
		return d61;
	}

	public void setD61(Integer d61) {
		this.d61 = d61;
	}

	public Integer getD62() {
		return d62;
	}

	public void setD62(Integer d62) {
		this.d62 = d62;
	}

	public Integer getD71() {
		return d71;
	}

	public void setD71(Integer d71) {
		this.d71 = d71;
	}

	public Integer getD72() {
		return d72;
	}

	public void setD72(Integer d72) {
		this.d72 = d72;
	}

	public Integer getD73() {
		return d73;
	}

	public void setD73(Integer d73) {
		this.d73 = d73;
	}

	public Integer getD74() {
		return d74;
	}

	public void setD74(Integer d74) {
		this.d74 = d74;
	}

	public Integer getD8() {
		return d8;
	}

	public void setD8(Integer d8) {
		this.d8 = d8;
	}

	public Integer getD91() {
		return d91;
	}

	public void setD91(Integer d91) {
		this.d91 = d91;
	}

	public Integer getD92() {
		return d92;
	}

	public void setD92(Integer d92) {
		this.d92 = d92;
	}

	public Integer getD93() {
		return d93;
	}

	public void setD93(Integer d93) {
		this.d93 = d93;
	}

	public Integer getD94() {
		return d94;
	}

	public void setD94(Integer d94) {
		this.d94 = d94;
	}

	public Integer getD101() {
		return d101;
	}

	public void setD101(Integer d101) {
		this.d101 = d101;
	}

	public Integer getD102() {
		return d102;
	}

	public void setD102(Integer d102) {
		this.d102 = d102;
	}

	public Integer getD103() {
		return d103;
	}

	public void setD103(Integer d103) {
		this.d103 = d103;
	}

	public Integer getD104() {
		return d104;
	}

	public void setD104(Integer d104) {
		this.d104 = d104;
	}

	public Integer getD11() {
		return d11;
	}

	public void setD11(Integer d11) {
		this.d11 = d11;
	}

	public Integer getD121() {
		return d121;
	}

	public void setD121(Integer d121) {
		this.d121 = d121;
	}

	public Integer getD122() {
		return d122;
	}

	public void setD122(Integer d122) {
		this.d122 = d122;
	}

	public Integer getD131() {
		return d131;
	}

	public void setD131(Integer d131) {
		this.d131 = d131;
	}

	public Integer getD132() {
		return d132;
	}

	public void setD132(Integer d132) {
		this.d132 = d132;
	}

	public Integer getD133() {
		return d133;
	}

	public void setD133(Integer d133) {
		this.d133 = d133;
	}

	public Integer getD134() {
		return d134;
	}

	public void setD134(Integer d134) {
		this.d134 = d134;
	}

	public Integer getD135() {
		return d135;
	}

	public void setD135(Integer d135) {
		this.d135 = d135;
	}

	public Integer getD136() {
		return d136;
	}

	public void setD136(Integer d136) {
		this.d136 = d136;
	}

	public Integer getD137() {
		return d137;
	}

	public void setD137(Integer d137) {
		this.d137 = d137;
	}

	public Integer getD138() {
		return d138;
	}

	public void setD138(Integer d138) {
		this.d138 = d138;
	}

	public Integer getD141() {
		return d141;
	}

	public void setD141(Integer d141) {
		this.d141 = d141;
	}

	public Integer getD142() {
		return d142;
	}

	public void setD142(Integer d142) {
		this.d142 = d142;
	}

	public Integer getD143() {
		return d143;
	}

	public void setD143(Integer d143) {
		this.d143 = d143;
	}

	public Integer getD144() {
		return d144;
	}

	public void setD144(Integer d144) {
		this.d144 = d144;
	}

	public Integer getD145() {
		return d145;
	}

	public void setD145(Integer d145) {
		this.d145 = d145;
	}

	public Integer getD146() {
		return d146;
	}

	public void setD146(Integer d146) {
		this.d146 = d146;
	}

	public Integer getD151() {
		return d151;
	}

	public void setD151(Integer d151) {
		this.d151 = d151;
	}

	public Integer getD152() {
		return d152;
	}

	public void setD152(Integer d152) {
		this.d152 = d152;
	}

	public Integer getD153() {
		return d153;
	}

	public void setD153(Integer d153) {
		this.d153 = d153;
	}

	public Integer getD161() {
		return d161;
	}

	public void setD161(Integer d161) {
		this.d161 = d161;
	}

	public Integer getD162() {
		return d162;
	}

	public void setD162(Integer d162) {
		this.d162 = d162;
	}

	public Integer getD171() {
		return d171;
	}

	public void setD171(Integer d171) {
		this.d171 = d171;
	}

	public Integer getD172() {
		return d172;
	}

	public void setD172(Integer d172) {
		this.d172 = d172;
	}

	public Integer getE111() {
		return e111;
	}

	public void setE111(Integer e111) {
		this.e111 = e111;
	}

	public Integer getE112() {
		return e112;
	}

	public void setE112(Integer e112) {
		this.e112 = e112;
	}

	public Integer getE121() {
		return e121;
	}

	public void setE121(Integer e121) {
		this.e121 = e121;
	}

	public Integer getE122() {
		return e122;
	}

	public void setE122(Integer e122) {
		this.e122 = e122;
	}

	public Integer getE13() {
		return e13;
	}

	public void setE13(Integer e13) {
		this.e13 = e13;
	}

	public Integer getE14() {
		return e14;
	}

	public void setE14(Integer e14) {
		this.e14 = e14;
	}

	public Integer getE15() {
		return e15;
	}

	public void setE15(Integer e15) {
		this.e15 = e15;
	}

	public Integer getE16() {
		return e16;
	}

	public void setE16(Integer e16) {
		this.e16 = e16;
	}

	public Integer getE17() {
		return e17;
	}

	public void setE17(Integer e17) {
		this.e17 = e17;
	}

	public Integer getE21() {
		return e21;
	}

	public void setE21(Integer e21) {
		this.e21 = e21;
	}

	public Integer getE22() {
		return e22;
	}

	public void setE22(Integer e22) {
		this.e22 = e22;
	}

	public Integer getE23() {
		return e23;
	}

	public void setE23(Integer e23) {
		this.e23 = e23;
	}

	public Integer getE24() {
		return e24;
	}

	public void setE24(Integer e24) {
		this.e24 = e24;
	}

	public Integer getE25() {
		return e25;
	}

	public void setE25(Integer e25) {
		this.e25 = e25;
	}

	public Integer getE26() {
		return e26;
	}

	public void setE26(Integer e26) {
		this.e26 = e26;
	}

	public Integer getE27() {
		return e27;
	}

	public void setE27(Integer e27) {
		this.e27 = e27;
	}

	public Integer getE28() {
		return e28;
	}

	public void setE28(Integer e28) {
		this.e28 = e28;
	}

	public Integer getE29() {
		return e29;
	}

	public void setE29(Integer e29) {
		this.e29 = e29;
	}

	public Integer getE210() {
		return e210;
	}

	public void setE210(Integer e210) {
		this.e210 = e210;
	}

	public Integer getE211() {
		return e211;
	}

	public void setE211(Integer e211) {
		this.e211 = e211;
	}

	public Integer getE212() {
		return e212;
	}

	public void setE212(Integer e212) {
		this.e212 = e212;
	}

	public Integer getE213() {
		return e213;
	}

	public void setE213(Integer e213) {
		this.e213 = e213;
	}

	public Integer getE214() {
		return e214;
	}

	public void setE214(Integer e214) {
		this.e214 = e214;
	}

	public Integer getE215() {
		return e215;
	}

	public void setE215(Integer e215) {
		this.e215 = e215;
	}

	public Integer getE216() {
		return e216;
	}

	public void setE216(Integer e216) {
		this.e216 = e216;
	}

	public Integer getE217() {
		return e217;
	}

	public void setE217(Integer e217) {
		this.e217 = e217;
	}

	public Integer getE218() {
		return e218;
	}

	public void setE218(Integer e218) {
		this.e218 = e218;
	}

	public Integer getE219() {
		return e219;
	}

	public void setE219(Integer e219) {
		this.e219 = e219;
	}

	public Integer getE220() {
		return e220;
	}

	public void setE220(Integer e220) {
		this.e220 = e220;
	}

	public Integer getE221() {
		return e221;
	}

	public void setE221(Integer e221) {
		this.e221 = e221;
	}

	public Integer getE222() {
		return e222;
	}

	public void setE222(Integer e222) {
		this.e222 = e222;
	}

	public Integer getE223() {
		return e223;
	}

	public void setE223(Integer e223) {
		this.e223 = e223;
	}

	public Integer getE224() {
		return e224;
	}

	public void setE224(Integer e224) {
		this.e224 = e224;
	}

	public Integer getE225() {
		return e225;
	}

	public void setE225(Integer e225) {
		this.e225 = e225;
	}

	public Integer getE226() {
		return e226;
	}

	public void setE226(Integer e226) {
		this.e226 = e226;
	}

	public Integer getE227() {
		return e227;
	}

	public void setE227(Integer e227) {
		this.e227 = e227;
	}

	public Integer getE228() {
		return e228;
	}

	public void setE228(Integer e228) {
		this.e228 = e228;
	}

	public Integer getE229() {
		return e229;
	}

	public void setE229(Integer e229) {
		this.e229 = e229;
	}

	public Integer getE230() {
		return e230;
	}

	public void setE230(Integer e230) {
		this.e230 = e230;
	}

	public Integer getE231() {
		return e231;
	}

	public void setE231(Integer e231) {
		this.e231 = e231;
	}

	public Integer getE232() {
		return e232;
	}

	public void setE232(Integer e232) {
		this.e232 = e232;
	}

	public Integer getE233() {
		return e233;
	}

	public void setE233(Integer e233) {
		this.e233 = e233;
	}

	public Integer getE234() {
		return e234;
	}

	public void setE234(Integer e234) {
		this.e234 = e234;
	}

	public Integer getE235() {
		return e235;
	}

	public void setE235(Integer e235) {
		this.e235 = e235;
	}

	public Integer getE236() {
		return e236;
	}

	public void setE236(Integer e236) {
		this.e236 = e236;
	}

	public Integer getE31() {
		return e31;
	}

	public void setE31(Integer e31) {
		this.e31 = e31;
	}

	public Integer getE32() {
		return e32;
	}

	public void setE32(Integer e32) {
		this.e32 = e32;
	}

	public Integer getE33() {
		return e33;
	}

	public void setE33(Integer e33) {
		this.e33 = e33;
	}

	public Integer getE341() {
		return e341;
	}

	public void setE341(Integer e341) {
		this.e341 = e341;
	}

	public Integer getE342() {
		return e342;
	}

	public void setE342(Integer e342) {
		this.e342 = e342;
	}

	public Integer getE351() {
		return e351;
	}

	public void setE351(Integer e351) {
		this.e351 = e351;
	}

	public Integer getE352() {
		return e352;
	}

	public void setE352(Integer e352) {
		this.e352 = e352;
	}

	public Integer getE36() {
		return e36;
	}

	public void setE36(Integer e36) {
		this.e36 = e36;
	}

	public Integer getE37() {
		return e37;
	}

	public void setE37(Integer e37) {
		this.e37 = e37;
	}

	public Integer getE38() {
		return e38;
	}

	public void setE38(Integer e38) {
		this.e38 = e38;
	}

	public Integer getE39() {
		return e39;
	}

	public void setE39(Integer e39) {
		this.e39 = e39;
	}

	public Integer getE310() {
		return e310;
	}

	public void setE310(Integer e310) {
		this.e310 = e310;
	}

	public Integer getE311() {
		return e311;
	}

	public void setE311(Integer e311) {
		this.e311 = e311;
	}

	public Integer getE312() {
		return e312;
	}

	public void setE312(Integer e312) {
		this.e312 = e312;
	}

	public Integer getE313() {
		return e313;
	}

	public void setE313(Integer e313) {
		this.e313 = e313;
	}

	public Integer getE41() {
		return e41;
	}

	public void setE41(Integer e41) {
		this.e41 = e41;
	}

	public Integer getE42() {
		return e42;
	}

	public void setE42(Integer e42) {
		this.e42 = e42;
	}

	public Integer getE43() {
		return e43;
	}

	public void setE43(Integer e43) {
		this.e43 = e43;
	}

	public Integer getE44() {
		return e44;
	}

	public void setE44(Integer e44) {
		this.e44 = e44;
	}

	public Integer getE45() {
		return e45;
	}

	public void setE45(Integer e45) {
		this.e45 = e45;
	}

	public Integer getE46() {
		return e46;
	}

	public void setE46(Integer e46) {
		this.e46 = e46;
	}

	public Integer getE47() {
		return e47;
	}

	public void setE47(Integer e47) {
		this.e47 = e47;
	}

	public Integer getE51() {
		return e51;
	}

	public void setE51(Integer e51) {
		this.e51 = e51;
	}

	public Integer getE52() {
		return e52;
	}

	public void setE52(Integer e52) {
		this.e52 = e52;
	}

	public Integer getE53() {
		return e53;
	}

	public void setE53(Integer e53) {
		this.e53 = e53;
	}

	public Integer getE54() {
		return e54;
	}

	public void setE54(Integer e54) {
		this.e54 = e54;
	}

	public Integer getE55() {
		return e55;
	}

	public void setE55(Integer e55) {
		this.e55 = e55;
	}

	public Integer getE56() {
		return e56;
	}

	public void setE56(Integer e56) {
		this.e56 = e56;
	}

	public Integer getE57() {
		return e57;
	}

	public void setE57(Integer e57) {
		this.e57 = e57;
	}

	public Integer getE58() {
		return e58;
	}

	public void setE58(Integer e58) {
		this.e58 = e58;
	}

	public Integer getE59() {
		return e59;
	}

	public void setE59(Integer e59) {
		this.e59 = e59;
	}

	public Integer getE510() {
		return e510;
	}

	public void setE510(Integer e510) {
		this.e510 = e510;
	}

	public Integer getE511() {
		return e511;
	}

	public void setE511(Integer e511) {
		this.e511 = e511;
	}

	public Integer getE512() {
		return e512;
	}

	public void setE512(Integer e512) {
		this.e512 = e512;
	}

	public Integer getE513() {
		return e513;
	}

	public void setE513(Integer e513) {
		this.e513 = e513;
	}

	public Integer getE61() {
		return e61;
	}

	public void setE61(Integer e61) {
		this.e61 = e61;
	}

	public Integer getE62() {
		return e62;
	}

	public void setE62(Integer e62) {
		this.e62 = e62;
	}

	public Integer getE63() {
		return e63;
	}

	public void setE63(Integer e63) {
		this.e63 = e63;
	}

	public Integer getE64() {
		return e64;
	}

	public void setE64(Integer e64) {
		this.e64 = e64;
	}

	public Integer getE65() {
		return e65;
	}

	public void setE65(Integer e65) {
		this.e65 = e65;
	}

	public Integer getE66() {
		return e66;
	}

	public void setE66(Integer e66) {
		this.e66 = e66;
	}

	public Integer getE67() {
		return e67;
	}

	public void setE67(Integer e67) {
		this.e67 = e67;
	}

	public Integer getE71() {
		return e71;
	}

	public void setE71(Integer e71) {
		this.e71 = e71;
	}

	public Integer getE72() {
		return e72;
	}

	public void setE72(Integer e72) {
		this.e72 = e72;
	}

	public Integer getE73() {
		return e73;
	}

	public void setE73(Integer e73) {
		this.e73 = e73;
	}

	public Integer getE74() {
		return e74;
	}

	public void setE74(Integer e74) {
		this.e74 = e74;
	}

	public Integer getE75() {
		return e75;
	}

	public void setE75(Integer e75) {
		this.e75 = e75;
	}

	public Integer getE76() {
		return e76;
	}

	public void setE76(Integer e76) {
		this.e76 = e76;
	}

	public Integer getE77() {
		return e77;
	}

	public void setE77(Integer e77) {
		this.e77 = e77;
	}

	public Integer getE81() {
		return e81;
	}

	public void setE81(Integer e81) {
		this.e81 = e81;
	}

	public Integer getE82() {
		return e82;
	}

	public void setE82(Integer e82) {
		this.e82 = e82;
	}

	public Integer getE83() {
		return e83;
	}

	public void setE83(Integer e83) {
		this.e83 = e83;
	}

	public Integer getE84() {
		return e84;
	}

	public void setE84(Integer e84) {
		this.e84 = e84;
	}

	public Integer getE85() {
		return e85;
	}

	public void setE85(Integer e85) {
		this.e85 = e85;
	}

	public Integer getE86() {
		return e86;
	}

	public void setE86(Integer e86) {
		this.e86 = e86;
	}

	public Integer getE87() {
		return e87;
	}

	public void setE87(Integer e87) {
		this.e87 = e87;
	}

	public Integer getE88() {
		return e88;
	}

	public void setE88(Integer e88) {
		this.e88 = e88;
	}

	public Integer getE91() {
		return e91;
	}

	public void setE91(Integer e91) {
		this.e91 = e91;
	}

	public Integer getE92() {
		return e92;
	}

	public void setE92(Integer e92) {
		this.e92 = e92;
	}

	public Integer getE93() {
		return e93;
	}

	public void setE93(Integer e93) {
		this.e93 = e93;
	}

	public Integer getE94() {
		return e94;
	}

	public void setE94(Integer e94) {
		this.e94 = e94;
	}

	public Integer getE101() {
		return e101;
	}

	public void setE101(Integer e101) {
		this.e101 = e101;
	}

	public Integer getE102() {
		return e102;
	}

	public void setE102(Integer e102) {
		this.e102 = e102;
	}

	public Integer getE103() {
		return e103;
	}

	public void setE103(Integer e103) {
		this.e103 = e103;
	}

	public Integer getE104() {
		return e104;
	}

	public void setE104(Integer e104) {
		this.e104 = e104;
	}

	public Integer getE105() {
		return e105;
	}

	public void setE105(Integer e105) {
		this.e105 = e105;
	}

	public Integer getE106() {
		return e106;
	}

	public void setE106(Integer e106) {
		this.e106 = e106;
	}

	public Integer getE107() {
		return e107;
	}

	public void setE107(Integer e107) {
		this.e107 = e107;
	}

	public Integer getE108() {
		return e108;
	}

	public void setE108(Integer e108) {
		this.e108 = e108;
	}

	public Integer getE109() {
		return e109;
	}

	public void setE109(Integer e109) {
		this.e109 = e109;
	}

	public Integer getE1010() {
		return e1010;
	}

	public void setE1010(Integer e1010) {
		this.e1010 = e1010;
	}

	public Integer getE1011() {
		return e1011;
	}

	public void setE1011(Integer e1011) {
		this.e1011 = e1011;
	}

	public Integer getE11g1() {
		return e11g1;
	}

	public void setE11g1(Integer e11g1) {
		this.e11g1 = e11g1;
	}

	public Integer getE1111() {
		return e1111;
	}

	public void setE1111(Integer e1111) {
		this.e1111 = e1111;
	}

	public Integer getE1112() {
		return e1112;
	}

	public void setE1112(Integer e1112) {
		this.e1112 = e1112;
	}

	public Integer getE1113() {
		return e1113;
	}

	public void setE1113(Integer e1113) {
		this.e1113 = e1113;
	}

	public Integer getE1114() {
		return e1114;
	}

	public void setE1114(Integer e1114) {
		this.e1114 = e1114;
	}

	public Integer getE1115() {
		return e1115;
	}

	public void setE1115(Integer e1115) {
		this.e1115 = e1115;
	}

	public Integer getE11g2() {
		return e11g2;
	}

	public void setE11g2(Integer e11g2) {
		this.e11g2 = e11g2;
	}

	public Integer getE1121() {
		return e1121;
	}

	public void setE1121(Integer e1121) {
		this.e1121 = e1121;
	}

	public Integer getE1122() {
		return e1122;
	}

	public void setE1122(Integer e1122) {
		this.e1122 = e1122;
	}

	public Integer getE1123() {
		return e1123;
	}

	public void setE1123(Integer e1123) {
		this.e1123 = e1123;
	}

	public Integer getE1124() {
		return e1124;
	}

	public void setE1124(Integer e1124) {
		this.e1124 = e1124;
	}

	public Integer getE1125() {
		return e1125;
	}

	public void setE1125(Integer e1125) {
		this.e1125 = e1125;
	}

	public Integer getE11g3() {
		return e11g3;
	}

	public void setE11g3(Integer e11g3) {
		this.e11g3 = e11g3;
	}

	public Integer getE1131() {
		return e1131;
	}

	public void setE1131(Integer e1131) {
		this.e1131 = e1131;
	}

	public Integer getE1132() {
		return e1132;
	}

	public void setE1132(Integer e1132) {
		this.e1132 = e1132;
	}

	public Integer getE1133() {
		return e1133;
	}

	public void setE1133(Integer e1133) {
		this.e1133 = e1133;
	}

	public Integer getE1134() {
		return e1134;
	}

	public void setE1134(Integer e1134) {
		this.e1134 = e1134;
	}

	public Integer getE1135() {
		return e1135;
	}

	public void setE1135(Integer e1135) {
		this.e1135 = e1135;
	}

	public Integer getE11g4() {
		return e11g4;
	}

	public void setE11g4(Integer e11g4) {
		this.e11g4 = e11g4;
	}

	public Integer getE1141() {
		return e1141;
	}

	public void setE1141(Integer e1141) {
		this.e1141 = e1141;
	}

	public Integer getF11() {
		return f11;
	}

	public void setF11(Integer f11) {
		this.f11 = f11;
	}

	public Integer getF12() {
		return f12;
	}

	public void setF12(Integer f12) {
		this.f12 = f12;
	}

	public Integer getF13() {
		return f13;
	}

	public void setF13(Integer f13) {
		this.f13 = f13;
	}

	public Integer getF14() {
		return f14;
	}

	public void setF14(Integer f14) {
		this.f14 = f14;
	}

	public Integer getF15() {
		return f15;
	}

	public void setF15(Integer f15) {
		this.f15 = f15;
	}

	public Integer getF16() {
		return f16;
	}

	public void setF16(Integer f16) {
		this.f16 = f16;
	}

	public Integer getF17() {
		return f17;
	}

	public void setF17(Integer f17) {
		this.f17 = f17;
	}

	public Integer getF18() {
		return f18;
	}

	public void setF18(Integer f18) {
		this.f18 = f18;
	}

	public Integer getF19() {
		return f19;
	}

	public void setF19(Integer f19) {
		this.f19 = f19;
	}

	public Integer getF110() {
		return f110;
	}

	public void setF110(Integer f110) {
		this.f110 = f110;
	}

	public Integer getF111() {
		return f111;
	}

	public void setF111(Integer f111) {
		this.f111 = f111;
	}

	public Integer getF21() {
		return f21;
	}

	public void setF21(Integer f21) {
		this.f21 = f21;
	}

	public Integer getF22() {
		return f22;
	}

	public void setF22(Integer f22) {
		this.f22 = f22;
	}

	public Integer getF23() {
		return f23;
	}

	public void setF23(Integer f23) {
		this.f23 = f23;
	}

	public Integer getF24() {
		return f24;
	}

	public void setF24(Integer f24) {
		this.f24 = f24;
	}

	public Integer getF25() {
		return f25;
	}

	public void setF25(Integer f25) {
		this.f25 = f25;
	}

	public Integer getF26() {
		return f26;
	}

	public void setF26(Integer f26) {
		this.f26 = f26;
	}

	public Integer getF27() {
		return f27;
	}

	public void setF27(Integer f27) {
		this.f27 = f27;
	}

	public Integer getF28() {
		return f28;
	}

	public void setF28(Integer f28) {
		this.f28 = f28;
	}

	public Integer getF29() {
		return f29;
	}

	public void setF29(Integer f29) {
		this.f29 = f29;
	}

	public Integer getF210() {
		return f210;
	}

	public void setF210(Integer f210) {
		this.f210 = f210;
	}

	public Integer getF31() {
		return f31;
	}

	public void setF31(Integer f31) {
		this.f31 = f31;
	}

	public Integer getF32() {
		return f32;
	}

	public void setF32(Integer f32) {
		this.f32 = f32;
	}

	public Integer getF33() {
		return f33;
	}

	public void setF33(Integer f33) {
		this.f33 = f33;
	}

	public Integer getF34() {
		return f34;
	}

	public void setF34(Integer f34) {
		this.f34 = f34;
	}

	public Integer getF35() {
		return f35;
	}

	public void setF35(Integer f35) {
		this.f35 = f35;
	}

	public Integer getF36() {
		return f36;
	}

	public void setF36(Integer f36) {
		this.f36 = f36;
	}

	public Integer getF37() {
		return f37;
	}

	public void setF37(Integer f37) {
		this.f37 = f37;
	}

	public Integer getF38() {
		return f38;
	}

	public void setF38(Integer f38) {
		this.f38 = f38;
	}

	public Integer getF39() {
		return f39;
	}

	public void setF39(Integer f39) {
		this.f39 = f39;
	}

	public Integer getF310() {
		return f310;
	}

	public void setF310(Integer f310) {
		this.f310 = f310;
	}

	public Integer getF41() {
		return f41;
	}

	public void setF41(Integer f41) {
		this.f41 = f41;
	}

	public Integer getF42() {
		return f42;
	}

	public void setF42(Integer f42) {
		this.f42 = f42;
	}

	public Integer getF43() {
		return f43;
	}

	public void setF43(Integer f43) {
		this.f43 = f43;
	}

	public Integer getF44() {
		return f44;
	}

	public void setF44(Integer f44) {
		this.f44 = f44;
	}

	public Integer getF45() {
		return f45;
	}

	public void setF45(Integer f45) {
		this.f45 = f45;
	}

	public Integer getF51() {
		return f51;
	}

	public void setF51(Integer f51) {
		this.f51 = f51;
	}

	public Integer getF52() {
		return f52;
	}

	public void setF52(Integer f52) {
		this.f52 = f52;
	}

	public Integer getF53() {
		return f53;
	}

	public void setF53(Integer f53) {
		this.f53 = f53;
	}

	public Integer getF54() {
		return f54;
	}

	public void setF54(Integer f54) {
		this.f54 = f54;
	}

	public Integer getF55() {
		return f55;
	}

	public void setF55(Integer f55) {
		this.f55 = f55;
	}

	public Integer getF56() {
		return f56;
	}

	public void setF56(Integer f56) {
		this.f56 = f56;
	}

	public Integer getF57() {
		return f57;
	}

	public void setF57(Integer f57) {
		this.f57 = f57;
	}

	public Integer getF58() {
		return f58;
	}

	public void setF58(Integer f58) {
		this.f58 = f58;
	}

	public Integer getF61() {
		return f61;
	}

	public void setF61(Integer f61) {
		this.f61 = f61;
	}

	public Integer getF62() {
		return f62;
	}

	public void setF62(Integer f62) {
		this.f62 = f62;
	}

	public Integer getF63() {
		return f63;
	}

	public void setF63(Integer f63) {
		this.f63 = f63;
	}

	public Integer getF64() {
		return f64;
	}

	public void setF64(Integer f64) {
		this.f64 = f64;
	}

	public Integer getF65() {
		return f65;
	}

	public void setF65(Integer f65) {
		this.f65 = f65;
	}

	public Integer getF66() {
		return f66;
	}

	public void setF66(Integer f66) {
		this.f66 = f66;
	}

	public Integer getF71() {
		return f71;
	}

	public void setF71(Integer f71) {
		this.f71 = f71;
	}

	public Integer getF72() {
		return f72;
	}

	public void setF72(Integer f72) {
		this.f72 = f72;
	}

	public Integer getF73() {
		return f73;
	}

	public void setF73(Integer f73) {
		this.f73 = f73;
	}

	public Integer getF74() {
		return f74;
	}

	public void setF74(Integer f74) {
		this.f74 = f74;
	}

	public Integer getF75() {
		return f75;
	}

	public void setF75(Integer f75) {
		this.f75 = f75;
	}

	public Integer getF76() {
		return f76;
	}

	public void setF76(Integer f76) {
		this.f76 = f76;
	}

	public Integer getF77() {
		return f77;
	}

	public void setF77(Integer f77) {
		this.f77 = f77;
	}

	public Integer getF78() {
		return f78;
	}

	public void setF78(Integer f78) {
		this.f78 = f78;
	}

	public Integer getF79() {
		return f79;
	}

	public void setF79(Integer f79) {
		this.f79 = f79;
	}

	public Integer getF710() {
		return f710;
	}

	public void setF710(Integer f710) {
		this.f710 = f710;
	}

	public Integer getF711() {
		return f711;
	}

	public void setF711(Integer f711) {
		this.f711 = f711;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
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

	public Area getArea() {
		return area;
	}

	public void setArea(Area area) {
		this.area = area;
	}

	public Integer getE_RH_score() {
		return e_RH_score;
	}

	public void setE_RH_score(Integer e_RH_score) {
		this.e_RH_score = e_RH_score;
	}

	public Integer getE_MHDS_score() {
		return e_MHDS_score;
	}

	public void setE_MHDS_score(Integer e_MHDS_score) {
		this.e_MHDS_score = e_MHDS_score;
	}

	public Integer getE_NHDS_score() {
		return e_NHDS_score;
	}

	public void setE_NHDS_score(Integer e_NHDS_score) {
		this.e_NHDS_score = e_NHDS_score;
	}

	public Integer getE_CHDS_score() {
		return e_CHDS_score;
	}

	public void setE_CHDS_score(Integer e_CHDS_score) {
		this.e_CHDS_score = e_CHDS_score;
	}

	public Integer getE_Vaccines_score() {
		return e_Vaccines_score;
	}

	public void setE_Vaccines_score(Integer e_Vaccines_score) {
		this.e_Vaccines_score = e_Vaccines_score;
	}

	public Integer getE_Antibiotics_score() {
		return e_Antibiotics_score;
	}

	public void setE_Antibiotics_score(Integer e_Antibiotics_score) {
		this.e_Antibiotics_score = e_Antibiotics_score;
	}

	public Integer getE_Infrastructure_score() {
		return e_Infrastructure_score;
	}

	public void setE_Infrastructure_score(Integer e_Infrastructure_score) {
		this.e_Infrastructure_score = e_Infrastructure_score;
	}

	public Integer getE_IP_score() {
		return e_IP_score;
	}

	public void setE_IP_score(Integer e_IP_score) {
		this.e_IP_score = e_IP_score;
	}

	public Integer getE_AHDS_score() {
		return e_AHDS_score;
	}

	public void setE_AHDS_score(Integer e_AHDS_score) {
		this.e_AHDS_score = e_AHDS_score;
	}

	public Integer getE_OE_score() {
		return e_OE_score;
	}

	public void setE_OE_score(Integer e_OE_score) {
		this.e_OE_score = e_OE_score;
	}

	public Integer getF_ANC_score() {
		return f_ANC_score;
	}

	public void setF_ANC_score(Integer f_ANC_score) {
		this.f_ANC_score = f_ANC_score;
	}

	public Integer getF_IPIP_score() {
		return f_IPIP_score;
	}

	public void setF_IPIP_score(Integer f_IPIP_score) {
		this.f_IPIP_score = f_IPIP_score;
	}

	public Integer getF_ENCR_score() {
		return f_ENCR_score;
	}

	public void setF_ENCR_score(Integer f_ENCR_score) {
		this.f_ENCR_score = f_ENCR_score;
	}

	public Integer getF_FP_score() {
		return f_FP_score;
	}

	public void setF_FP_score(Integer f_FP_score) {
		this.f_FP_score = f_FP_score;
	}

	public Integer getF_CS_score() {
		return f_CS_score;
	}

	public void setF_CS_score(Integer f_CS_score) {
		this.f_CS_score = f_CS_score;
	}

	public Integer getF_FMO_score() {
		return f_FMO_score;
	}

	public void setF_FMO_score(Integer f_FMO_score) {
		this.f_FMO_score = f_FMO_score;
	}

	public Integer getF_AH_score() {
		return f_AH_score;
	}

	public void setF_AH_score(Integer f_AH_score) {
		this.f_AH_score = f_AH_score;
	}

	public Integer getE_total_score() {
		return e_total_score;
	}

	public void setE_total_score(Integer e_total_score) {
		this.e_total_score = e_total_score;
	}

	public Integer getF_total_score() {
		return f_total_score;
	}

	public void setF_total_score(Integer f_total_score) {
		this.f_total_score = f_total_score;
	}

	public Integer getNote_SC_1() {
		return note_SC_1;
	}

	public void setNote_SC_1(Integer note_SC_1) {
		this.note_SC_1 = note_SC_1;
	}

	public Integer getNote_Non_24x7_PHC_1() {
		return note_Non_24x7_PHC_1;
	}

	public void setNote_Non_24x7_PHC_1(Integer note_Non_24x7_PHC_1) {
		this.note_Non_24x7_PHC_1 = note_Non_24x7_PHC_1;
	}

	public Integer getNote_24x7_PHC_1() {
		return note_24x7_PHC_1;
	}

	public void setNote_24x7_PHC_1(Integer note_24x7_PHC_1) {
		this.note_24x7_PHC_1 = note_24x7_PHC_1;
	}

	public Integer getNote_Non_FRU_CHC_1() {
		return note_Non_FRU_CHC_1;
	}

	public void setNote_Non_FRU_CHC_1(Integer note_Non_FRU_CHC_1) {
		this.note_Non_FRU_CHC_1 = note_Non_FRU_CHC_1;
	}

	public Integer getNote_FRU_CHC_1() {
		return note_FRU_CHC_1;
	}

	public void setNote_FRU_CHC_1(Integer note_FRU_CHC_1) {
		this.note_FRU_CHC_1 = note_FRU_CHC_1;
	}

	public Integer getNote_SDH_1() {
		return note_SDH_1;
	}

	public void setNote_SDH_1(Integer note_SDH_1) {
		this.note_SDH_1 = note_SDH_1;
	}

	public Integer getNote_DH_1() {
		return note_DH_1;
	}

	public void setNote_DH_1(Integer note_DH_1) {
		this.note_DH_1 = note_DH_1;
	}

	public Integer getNote_Area_Hospital_1() {
		return note_Area_Hospital_1;
	}

	public void setNote_Area_Hospital_1(Integer note_Area_Hospital_1) {
		this.note_Area_Hospital_1 = note_Area_Hospital_1;
	}

	public Integer getNote_MC_1() {
		return note_MC_1;
	}

	public void setNote_MC_1(Integer note_MC_1) {
		this.note_MC_1 = note_MC_1;
	}

	public Integer getNote_SC_2() {
		return note_SC_2;
	}

	public void setNote_SC_2(Integer note_SC_2) {
		this.note_SC_2 = note_SC_2;
	}

	public Integer getNote_Non_24x7_PHC_2() {
		return note_Non_24x7_PHC_2;
	}

	public void setNote_Non_24x7_PHC_2(Integer note_Non_24x7_PHC_2) {
		this.note_Non_24x7_PHC_2 = note_Non_24x7_PHC_2;
	}

	public Integer getNote_24x7_PHC_2() {
		return note_24x7_PHC_2;
	}

	public void setNote_24x7_PHC_2(Integer note_24x7_PHC_2) {
		this.note_24x7_PHC_2 = note_24x7_PHC_2;
	}

	public Integer getNote_Non_FRU_CHC_2() {
		return note_Non_FRU_CHC_2;
	}

	public void setNote_Non_FRU_CHC_2(Integer note_Non_FRU_CHC_2) {
		this.note_Non_FRU_CHC_2 = note_Non_FRU_CHC_2;
	}

	public Integer getNote_FRU_CHC_2() {
		return note_FRU_CHC_2;
	}

	public void setNote_FRU_CHC_2(Integer note_FRU_CHC_2) {
		this.note_FRU_CHC_2 = note_FRU_CHC_2;
	}

	public Integer getNote_SDH_2() {
		return note_SDH_2;
	}

	public void setNote_SDH_2(Integer note_SDH_2) {
		this.note_SDH_2 = note_SDH_2;
	}

	public Integer getNote_DH_2() {
		return note_DH_2;
	}

	public void setNote_DH_2(Integer note_DH_2) {
		this.note_DH_2 = note_DH_2;
	}

	public Integer getNote_Area_Hospital_2() {
		return note_Area_Hospital_2;
	}

	public void setNote_Area_Hospital_2(Integer note_Area_Hospital_2) {
		this.note_Area_Hospital_2 = note_Area_Hospital_2;
	}

	public Integer getNote_MC_2() {
		return note_MC_2;
	}

	public void setNote_MC_2(Integer note_MC_2) {
		this.note_MC_2 = note_MC_2;
	}

	public Integer getNote_SC() {
		return note_SC;
	}

	public void setNote_SC(Integer note_SC) {
		this.note_SC = note_SC;
	}

	public Integer getNote_Non_24x7_PHC() {
		return note_Non_24x7_PHC;
	}

	public void setNote_Non_24x7_PHC(Integer note_Non_24x7_PHC) {
		this.note_Non_24x7_PHC = note_Non_24x7_PHC;
	}

	public Integer getNote_24x7_PHC() {
		return note_24x7_PHC;
	}

	public void setNote_24x7_PHC(Integer note_24x7_PHC) {
		this.note_24x7_PHC = note_24x7_PHC;
	}

	public Integer getNote_Non_FRU_CHC() {
		return note_Non_FRU_CHC;
	}

	public void setNote_Non_FRU_CHC(Integer note_Non_FRU_CHC) {
		this.note_Non_FRU_CHC = note_Non_FRU_CHC;
	}

	public Integer getNote_FRU_CHC() {
		return note_FRU_CHC;
	}

	public void setNote_FRU_CHC(Integer note_FRU_CHC) {
		this.note_FRU_CHC = note_FRU_CHC;
	}

	public Integer getNote_SDH() {
		return note_SDH;
	}

	public void setNote_SDH(Integer note_SDH) {
		this.note_SDH = note_SDH;
	}

	public Integer getNote_DH() {
		return note_DH;
	}

	public void setNote_DH(Integer note_DH) {
		this.note_DH = note_DH;
	}

	public Integer getNote_Area_Hospital() {
		return note_Area_Hospital;
	}

	public void setNote_Area_Hospital(Integer note_Area_Hospital) {
		this.note_Area_Hospital = note_Area_Hospital;
	}

	public Integer getNote_MC() {
		return note_MC;
	}

	public void setNote_MC(Integer note_MC) {
		this.note_MC = note_MC;
	}

	public EssUser getUser() {
		return user;
	}

	public void setUser(EssUser user) {
		this.user = user;
	}

	public Integer gethA1() {
		return hA1;
	}

	public void sethA1(Integer hA1) {
		this.hA1 = hA1;
	}

	public Integer gethA2() {
		return hA2;
	}

	public void sethA2(Integer hA2) {
		this.hA2 = hA2;
	}

	public Integer gethA2p1() {
		return hA2p1;
	}

	public void sethA2p1(Integer hA2p1) {
		this.hA2p1 = hA2p1;
	}

	public Integer gethA2p2() {
		return hA2p2;
	}

	public void sethA2p2(Integer hA2p2) {
		this.hA2p2 = hA2p2;
	}

	public Integer gethA3() {
		return hA3;
	}

	public void sethA3(Integer hA3) {
		this.hA3 = hA3;
	}

	public Integer gethA3p1() {
		return hA3p1;
	}

	public void sethA3p1(Integer hA3p1) {
		this.hA3p1 = hA3p1;
	}

	public Integer gethB1() {
		return hB1;
	}

	public void sethB1(Integer hB1) {
		this.hB1 = hB1;
	}

	public Integer gethB2() {
		return hB2;
	}

	public void sethB2(Integer hB2) {
		this.hB2 = hB2;
	}

	public Integer gethC1() {
		return hC1;
	}

	public void sethC1(Integer hC1) {
		this.hC1 = hC1;
	}

	public Integer gethC2() {
		return hC2;
	}

	public void sethC2(Integer hC2) {
		this.hC2 = hC2;
	}

	public Integer gethD1() {
		return hD1;
	}

	public void sethD1(Integer hD1) {
		this.hD1 = hD1;
	}

	public Float gethE1() {
		return hE1;
	}

	public void sethE1(Float hE1) {
		this.hE1 = hE1;
	}

	public Integer gethE2p1() {
		return hE2p1;
	}

	public void sethE2p1(Integer hE2p1) {
		this.hE2p1 = hE2p1;
	}

	public Integer gethE2p2() {
		return hE2p2;
	}

	public void sethE2p2(Integer hE2p2) {
		this.hE2p2 = hE2p2;
	}

	public Integer gethE2p3() {
		return hE2p3;
	}

	public void sethE2p3(Integer hE2p3) {
		this.hE2p3 = hE2p3;
	}

	public Integer gethE2p4() {
		return hE2p4;
	}

	public void sethE2p4(Integer hE2p4) {
		this.hE2p4 = hE2p4;
	}

	public Integer gethE2p5() {
		return hE2p5;
	}

	public void sethE2p5(Integer hE2p5) {
		this.hE2p5 = hE2p5;
	}

	public Integer gethE3p1() {
		return hE3p1;
	}

	public void sethE3p1(Integer hE3p1) {
		this.hE3p1 = hE3p1;
	}

	public Integer gethE3p2() {
		return hE3p2;
	}

	public void sethE3p2(Integer hE3p2) {
		this.hE3p2 = hE3p2;
	}

	public Integer gethE3p3() {
		return hE3p3;
	}

	public void sethE3p3(Integer hE3p3) {
		this.hE3p3 = hE3p3;
	}

	public Integer gethE3p4() {
		return hE3p4;
	}

	public void sethE3p4(Integer hE3p4) {
		this.hE3p4 = hE3p4;
	}

	public Integer gethE3p5() {
		return hE3p5;
	}

	public void sethE3p5(Integer hE3p5) {
		this.hE3p5 = hE3p5;
	}

	public Integer gethF1() {
		return hF1;
	}

	public void sethF1(Integer hF1) {
		this.hF1 = hF1;
	}

	public Integer gethF1p1() {
		return hF1p1;
	}

	public void sethF1p1(Integer hF1p1) {
		this.hF1p1 = hF1p1;
	}

	public Integer gethF1p2() {
		return hF1p2;
	}

	public void sethF1p2(Integer hF1p2) {
		this.hF1p2 = hF1p2;
	}

	public Integer gethF1p2p1() {
		return hF1p2p1;
	}

	public void sethF1p2p1(Integer hF1p2p1) {
		this.hF1p2p1 = hF1p2p1;
	}

	public Integer gethF2() {
		return hF2;
	}

	public void sethF2(Integer hF2) {
		this.hF2 = hF2;
	}

	public Integer getiA1() {
		return iA1;
	}

	public void setiA1(Integer iA1) {
		this.iA1 = iA1;
	}

	public Integer getiA2() {
		return iA2;
	}

	public void setiA2(Integer iA2) {
		this.iA2 = iA2;
	}

	public Integer getiB1() {
		return iB1;
	}

	public void setiB1(Integer iB1) {
		this.iB1 = iB1;
	}

	public Integer getiB2() {
		return iB2;
	}

	public void setiB2(Integer iB2) {
		this.iB2 = iB2;
	}

	public Integer getiB3() {
		return iB3;
	}

	public void setiB3(Integer iB3) {
		this.iB3 = iB3;
	}

	public Integer getiB4() {
		return iB4;
	}

	public void setiB4(Integer iB4) {
		this.iB4 = iB4;
	}

	public Integer getiB4p1() {
		return iB4p1;
	}

	public void setiB4p1(Integer iB4p1) {
		this.iB4p1 = iB4p1;
	}

	public Integer getiC1() {
		return iC1;
	}

	public void setiC1(Integer iC1) {
		this.iC1 = iC1;
	}

	public Integer getiC2() {
		return iC2;
	}

	public void setiC2(Integer iC2) {
		this.iC2 = iC2;
	}

	public Integer getiC3() {
		return iC3;
	}

	public void setiC3(Integer iC3) {
		this.iC3 = iC3;
	}

	public Integer getiDA1() {
		return iDA1;
	}

	public void setiDA1(Integer iDA1) {
		this.iDA1 = iDA1;
	}

	public Integer getiDA2() {
		return iDA2;
	}

	public void setiDA2(Integer iDA2) {
		this.iDA2 = iDA2;
	}

	public Integer getiDA3() {
		return iDA3;
	}

	public void setiDA3(Integer iDA3) {
		this.iDA3 = iDA3;
	}

	public Integer getiDA3p1() {
		return iDA3p1;
	}

	public void setiDA3p1(Integer iDA3p1) {
		this.iDA3p1 = iDA3p1;
	}

	public Integer getiDA3p2() {
		return iDA3p2;
	}

	public void setiDA3p2(Integer iDA3p2) {
		this.iDA3p2 = iDA3p2;
	}

	public Integer getiDA3p3() {
		return iDA3p3;
	}

	public void setiDA3p3(Integer iDA3p3) {
		this.iDA3p3 = iDA3p3;
	}

	public Integer getiDA3p4() {
		return iDA3p4;
	}

	public void setiDA3p4(Integer iDA3p4) {
		this.iDA3p4 = iDA3p4;
	}

	public Integer getiDA3p5() {
		return iDA3p5;
	}

	public void setiDA3p5(Integer iDA3p5) {
		this.iDA3p5 = iDA3p5;
	}

	public Integer getiDA3p6() {
		return iDA3p6;
	}

	public void setiDA3p6(Integer iDA3p6) {
		this.iDA3p6 = iDA3p6;
	}

	public Integer getiDA3p7() {
		return iDA3p7;
	}

	public void setiDA3p7(Integer iDA3p7) {
		this.iDA3p7 = iDA3p7;
	}

	public Integer getiDB1() {
		return iDB1;
	}

	public void setiDB1(Integer iDB1) {
		this.iDB1 = iDB1;
	}

	public Integer getiDB2() {
		return iDB2;
	}

	public void setiDB2(Integer iDB2) {
		this.iDB2 = iDB2;
	}

	public Integer getiDB3() {
		return iDB3;
	}

	public void setiDB3(Integer iDB3) {
		this.iDB3 = iDB3;
	}

	public Integer getiDC1() {
		return iDC1;
	}

	public void setiDC1(Integer iDC1) {
		this.iDC1 = iDC1;
	}

	public Integer getiDC2() {
		return iDC2;
	}

	public void setiDC2(Integer iDC2) {
		this.iDC2 = iDC2;
	}

	public Integer getiDC3() {
		return iDC3;
	}

	public void setiDC3(Integer iDC3) {
		this.iDC3 = iDC3;
	}

	public Integer getiDD1() {
		return iDD1;
	}

	public void setiDD1(Integer iDD1) {
		this.iDD1 = iDD1;
	}

	public Integer getiDD2() {
		return iDD2;
	}

	public void setiDD2(Integer iDD2) {
		this.iDD2 = iDD2;
	}

	public Integer getiDD3() {
		return iDD3;
	}

	public void setiDD3(Integer iDD3) {
		this.iDD3 = iDD3;
	}

	public Integer getiDE1() {
		return iDE1;
	}

	public void setiDE1(Integer iDE1) {
		this.iDE1 = iDE1;
	}

	public Integer getiDE2() {
		return iDE2;
	}

	public void setiDE2(Integer iDE2) {
		this.iDE2 = iDE2;
	}

	public Integer getiDE3() {
		return iDE3;
	}

	public void setiDE3(Integer iDE3) {
		this.iDE3 = iDE3;
	}

	public Integer getiDE4() {
		return iDE4;
	}

	public void setiDE4(Integer iDE4) {
		this.iDE4 = iDE4;
	}

	public Integer getiDE5() {
		return iDE5;
	}

	public void setiDE5(Integer iDE5) {
		this.iDE5 = iDE5;
	}

	public Integer getiDE6() {
		return iDE6;
	}

	public void setiDE6(Integer iDE6) {
		this.iDE6 = iDE6;
	}

	public Integer getiE1() {
		return iE1;
	}

	public void setiE1(Integer iE1) {
		this.iE1 = iE1;
	}

	public Integer getiE2() {
		return iE2;
	}

	public void setiE2(Integer iE2) {
		this.iE2 = iE2;
	}

	public Integer getiE3() {
		return iE3;
	}

	public void setiE3(Integer iE3) {
		this.iE3 = iE3;
	}

	public Integer getiE4() {
		return iE4;
	}

	public void setiE4(Integer iE4) {
		this.iE4 = iE4;
	}

	public Integer getiE5() {
		return iE5;
	}

	public void setiE5(Integer iE5) {
		this.iE5 = iE5;
	}

	public Integer getiE6() {
		return iE6;
	}

	public void setiE6(Integer iE6) {
		this.iE6 = iE6;
	}

	public Integer getiF1() {
		return iF1;
	}

	public void setiF1(Integer iF1) {
		this.iF1 = iF1;
	}

	public Integer getiF2() {
		return iF2;
	}

	public void setiF2(Integer iF2) {
		this.iF2 = iF2;
	}

	public Integer getiF3() {
		return iF3;
	}

	public void setiF3(Integer iF3) {
		this.iF3 = iF3;
	}

	public Integer getiF4() {
		return iF4;
	}

	public void setiF4(Integer iF4) {
		this.iF4 = iF4;
	}

	public Integer getiG1() {
		return iG1;
	}

	public void setiG1(Integer iG1) {
		this.iG1 = iG1;
	}

	public Integer getiG2() {
		return iG2;
	}

	public void setiG2(Integer iG2) {
		this.iG2 = iG2;
	}

	public Integer getiG3() {
		return iG3;
	}

	public void setiG3(Integer iG3) {
		this.iG3 = iG3;
	}

	public Integer getiG3p1() {
		return iG3p1;
	}

	public void setiG3p1(Integer iG3p1) {
		this.iG3p1 = iG3p1;
	}

	public Integer getiG4() {
		return iG4;
	}

	public void setiG4(Integer iG4) {
		this.iG4 = iG4;
	}

	public Integer getiG4p1() {
		return iG4p1;
	}

	public void setiG4p1(Integer iG4p1) {
		this.iG4p1 = iG4p1;
	}

	public Integer getiG5() {
		return iG5;
	}

	public void setiG5(Integer iG5) {
		this.iG5 = iG5;
	}

	public Integer getiG6() {
		return iG6;
	}

	public void setiG6(Integer iG6) {
		this.iG6 = iG6;
	}

	public Integer getiH1() {
		return iH1;
	}

	public void setiH1(Integer iH1) {
		this.iH1 = iH1;
	}

	public Integer getiH1p1() {
		return iH1p1;
	}

	public void setiH1p1(Integer iH1p1) {
		this.iH1p1 = iH1p1;
	}

	public Integer getiH2() {
		return iH2;
	}

	public void setiH2(Integer iH2) {
		this.iH2 = iH2;
	}

	public Integer getE_RH_score_max() {
		return e_RH_score_max;
	}

	public void setE_RH_score_max(Integer e_RH_score_max) {
		this.e_RH_score_max = e_RH_score_max;
	}

	public Integer getE_MHDS_score_max() {
		return e_MHDS_score_max;
	}

	public void setE_MHDS_score_max(Integer e_MHDS_score_max) {
		this.e_MHDS_score_max = e_MHDS_score_max;
	}

	public Integer getE_NHDS_score_max() {
		return e_NHDS_score_max;
	}

	public void setE_NHDS_score_max(Integer e_NHDS_score_max) {
		this.e_NHDS_score_max = e_NHDS_score_max;
	}

	public Integer getE_CHDS_score_max() {
		return e_CHDS_score_max;
	}

	public void setE_CHDS_score_max(Integer e_CHDS_score_max) {
		this.e_CHDS_score_max = e_CHDS_score_max;
	}

	public Integer getE_Vaccines_score_max() {
		return e_Vaccines_score_max;
	}

	public void setE_Vaccines_score_max(Integer e_Vaccines_score_max) {
		this.e_Vaccines_score_max = e_Vaccines_score_max;
	}

	public Integer getE_Antibiotics_score_max() {
		return e_Antibiotics_score_max;
	}

	public void setE_Antibiotics_score_max(Integer e_Antibiotics_score_max) {
		this.e_Antibiotics_score_max = e_Antibiotics_score_max;
	}

	public Integer getE_Infrastructure_score_max() {
		return e_Infrastructure_score_max;
	}

	public void setE_Infrastructure_score_max(Integer e_Infrastructure_score_max) {
		this.e_Infrastructure_score_max = e_Infrastructure_score_max;
	}

	public Integer getE_IP_score_max() {
		return e_IP_score_max;
	}

	public void setE_IP_score_max(Integer e_IP_score_max) {
		this.e_IP_score_max = e_IP_score_max;
	}

	public Integer getE_AHDS_score_max() {
		return e_AHDS_score_max;
	}

	public void setE_AHDS_score_max(Integer e_AHDS_score_max) {
		this.e_AHDS_score_max = e_AHDS_score_max;
	}

	public Integer getE_OE_score_max() {
		return e_OE_score_max;
	}

	public void setE_OE_score_max(Integer e_OE_score_max) {
		this.e_OE_score_max = e_OE_score_max;
	}

	public Integer getF_ANC_score_max() {
		return f_ANC_score_max;
	}

	public void setF_ANC_score_max(Integer f_ANC_score_max) {
		this.f_ANC_score_max = f_ANC_score_max;
	}

	public Integer getF_IPIP_score_max() {
		return f_IPIP_score_max;
	}

	public void setF_IPIP_score_max(Integer f_IPIP_score_max) {
		this.f_IPIP_score_max = f_IPIP_score_max;
	}

	public Integer getF_ENCR_score_max() {
		return f_ENCR_score_max;
	}

	public void setF_ENCR_score_max(Integer f_ENCR_score_max) {
		this.f_ENCR_score_max = f_ENCR_score_max;
	}

	public Integer getF_FP_score_max() {
		return f_FP_score_max;
	}

	public void setF_FP_score_max(Integer f_FP_score_max) {
		this.f_FP_score_max = f_FP_score_max;
	}

	public Integer getF_CS_score_max() {
		return f_CS_score_max;
	}

	public void setF_CS_score_max(Integer f_CS_score_max) {
		this.f_CS_score_max = f_CS_score_max;
	}

	public Integer getF_FMO_score_max() {
		return f_FMO_score_max;
	}

	public void setF_FMO_score_max(Integer f_FMO_score_max) {
		this.f_FMO_score_max = f_FMO_score_max;
	}

	public Integer getF_AH_score_max() {
		return f_AH_score_max;
	}

	public void setF_AH_score_max(Integer f_AH_score_max) {
		this.f_AH_score_max = f_AH_score_max;
	}

	public Integer getE_total_score_max() {
		return e_total_score_max;
	}

	public void setE_total_score_max(Integer e_total_score_max) {
		this.e_total_score_max = e_total_score_max;
	}

	public Integer getF_total_score_max() {
		return f_total_score_max;
	}

	public void setF_total_score_max(Integer f_total_score_max) {
		this.f_total_score_max = f_total_score_max;
	}

	public Integer getChecklist_score() {
		return checklist_score;
	}

	public void setChecklist_score(Integer checklist_score) {
		this.checklist_score = checklist_score;
	}

	public Integer getChecklist_score_max() {
		return checklist_score_max;
	}

	public void setChecklist_score_max(Integer checklist_score_max) {
		this.checklist_score_max = checklist_score_max;
	}

	public Integer getfSterilizationTotal() {
		return fSterilizationTotal;
	}

	public void setfSterilizationTotal(Integer fSterilizationTotal) {
		this.fSterilizationTotal = fSterilizationTotal;
	}

	public Integer getSterilizationTotal() {
		return sterilizationTotal;
	}

	public void setSterilizationTotal(Integer sterilizationTotal) {
		this.sterilizationTotal = sterilizationTotal;
	}

	public Boolean getIsAggregated() {
		return isAggregated;
	}

	public void setIsAggregated(Boolean isAggregated) {
		this.isAggregated = isAggregated;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public Integer getE1145() {
		return e1145;
	}

	public void setE1145(Integer e1145) {
		this.e1145 = e1145;
	}

	public String getAppVersionName() {
		return appVersionName;
	}

	public void setAppVersionName(String appVersionName) {
		this.appVersionName = appVersionName;
	}

}
