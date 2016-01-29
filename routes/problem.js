var express = require('express');
var router = express.Router();

var index = 0;
var graphs = [
	'K??FFB_F?wB_',
	'K??FEb_F?wD_',
	'K??FEbGL@WB_',
	'K??FEagT@WB_',
	'K??FEaKY@gB_',
	'K??FEaKR@oE_',
	'K?AEF@oM?w@o',
	'K?AEB`gHcoB_',
	'K?AEEHaM@oB_',
	'K?AEEHEM@oF?',
	'K?AEEDcF@oF?',
	'K?AEDDWX@oB_',
	'K?ABF@ce?sB_',
	'K?ABEb_J?sB_',
	'K?ABEagE`gH_',
	'K?ABE`Ke@gDO',
	'K?ABE`Ke@WEO',
	'K?ABBb_e?[B_',
	'K?ABBb_E_wP_',
	'K?ABB`gc_wP_',
	'K?ABB`gEcgP_',
	'K?ABCqWUBGCo',
	'K?ABArOb@WEO',
	'K?ABApok?[P_',
	'K?ABApoMCWOo',
	'K?ABApoc`WP_',
	'K?ABArCe@gDO',
	'K?ABCiWRB_DO',
	'K?ABCiWFBOKO',
	'K?ABCiKU@oKO',
	'K?ABEDoM?wP_',
	'K?ABEDWM?wS_',
	'K?ABEESU@WF?',
	'K?ABBF_e?wB_',
	'K?ABBFOe@WB_',
	'K?ABBFOb@oB_',
	'K?ABBFCe@oB_',
	'K?ABCfOY?wD_',
	'K?ABCfOR@oD_',
	'K?ABCfGT@oD_',
	'K?ABCeWU@WK_',
	'K?ABCdWT@WT?',
	'K?ABCfCY?wF?',
	'K?ABCfCU@WF?',
	'K?ABAdoi?wP_',
	'K?ABAdgi?wQ_',
	'K?ABAfCi?wF?',
	'K?AB?vOTDOD_',
	'K?AB?tos@WP_',
	'K?ABCN_U?wF?',
	'K?ABCNOY?wF?',
	'K?ACKLoYAoF?',
	'K?BD?qcKaoHG',
	'K?BD?pck?sHG',
	'K?BD?pSw@SBG',
	'K?`@F@gd?sAo',
	'K?`@Eb_M?k@o',
	'K?`@Eb_J?sAo',
	'K?`@Eb_F?[EO',
	'K?`@E`gh?sAo',
	'K?`@E`gFCcCo',
	'K?`@E`gFCKEO',
	'K?`@E`gEcKE_',
	'K?`@E`Wh?kDO',
	'K?`@EaKY?kEO',
	'K?`@EaKX?sEO',
	'K?`@EROM?kCo',
	'K?`@EQgLAcAo',
	'K?`@EQK[?kEO',
	'K?`@Cr_T?[EO',
	'K?`@CrGX?kEO',
	'K?`@CrGT@KEO',
	'K?`@CqW[AKCo',
	'K?`@CrCY?kEO',
	'K?`DAagK_iH_',
	'K?`DAagIagAg',
	'K?`D@`gE_iW_',
	'K?`D@`cS_wPG',
	'K?`D@bAJAgBG',
	'K?`D@`ae?iH_',
	'K?`D@aQY?wGg',
	'K?`@`ago_YI_',
	'K?`CRAWK`gGg',
	'K?`CRAI[@gAg',
	'K?`CPbGP`gEG',
	'K?`CPbGHb_Ag',
	'K?`CPag[?kGg',
	'K?`CPagXAcAg',
	'K?`CPagWagAg',
	'K?`CPagPagEG',
	'K?`CPaIWPgI_',
	'K?`CPaIKRGI_',
	'K?`CPaIPR_E_',
	'KCOcaOccaQCc'
];

/* GET problem definition. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({
  	'graph6String': graphs[index++],
  	'url': '/solution',
  	'functionId': 'nEdges'
  }));
});

module.exports = router;
