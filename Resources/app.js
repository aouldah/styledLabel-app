var win = Ti.UI.createWindow({
	backgroundColor : "#fff"
});
var StyledLabel = require('ti.styledlabel');

var container = Ti.UI.createScrollView({
	top : 85,
	bottom : 20,
	height : Ti.UI.SIZE
});
win.add(container);

function parseTweetToHTML(text) {
	Ti.API.info("Before text ==> " + text);
	var tmpText = text.replace(/@msc/g, '<a href="http://google.com/">Google</a>').replace(/@site/g, '<a href="http://twiter.com/">Twitter</a>').replace(/@fbh/g, '<a href="http://facebook.com/"> Facebook</a>');
	return tmpText;
}

var sLabel = [];
var questionObj = {
	"data" : [{
		"topic" : "Topic 1",
		"questions" : [{
			"question_en" : "What is this?",
			"answer_en" : "Lorem Ipsum is simply dummy text of the printing and type setting @msc industry. Lorem Ipsum has been the industry's standard dummy @site text ever since the 1500s, when an unknown printer took a galley of type and scrambled it <ul><li>Point 0</li><li>Point 1</li><li>Point 2</li><li>Point 3</li></ul>"
		}, {
			"question_en" : "dummy text of the printing?",
			"answer_en" : "Lorem Ipsum is simply @site dummy text of the printing and @msc type setting @msc industry."
		}]
	}, {
		"topic" : "Topic 2",
		"questions" : [{
			"question_en" : "Lorem Ipsum is simply dummy text?",
			"answer_en" : "Lorem Ipsum is simply dummy text of the printing and  @site Lorem Ipsum is simply dummy text @msc took a galley of type and scrambled it"
		}, {
			"question_en" : "simply dummy text?",
			"answer_en" : "dummy text of the printing and  Lorem Ipsum is @site simply dummy text of the @fbh printing and  Lorem Ipsum is simply"
		}]
	}]
};

var qaList = Ti.UI.createView({
	layout : "vertical",
	height : Ti.UI.SIZE,
	top : 0,
	left : 10,
	right : 4,
});
container.add(qaList);

var answerView = [];
var prevSelected = null;

qaList.addEventListener('click', function(e) {
	if (e.source.rowId) {
		if (prevSelected && prevSelected != e.source.rowId) {
			answerView[prevSelected].height = 0;
		}
		answerView[e.source.rowId].height = Ti.UI.SIZE;
		prevSelected = e.source.rowId;
	}
});

for (var k = 0; k < questionObj.data.length; k++) {
	var sectionLabel = Ti.UI.createLabel({
		text : questionObj.data[k].topic,
		height : Ti.UI.SIZE,
		color : 'blue',
		top : 8,
		left : 0,
		font : {
			fontSize : 16,
			fontWeight : 'bold',
			fontFamily : 'Helvetica Neue'
		}
	});
	qaList.add(sectionLabel);

	var separator = Ti.UI.createView({
		backgroundColor : '#999',
		height : 3,
		left : 0,
		right : 0,
		top : 0
	});
	qaList.add(separator);

	for (var i = 0; i < questionObj.data[k].questions.length; i++) {
		var rowContainer = Ti.UI.createView({
			rowId : k + "_" + i,
			backgroundColor : '#DEE2E7',
			layout : "vertical",
			height : Ti.UI.SIZE,
			left : 0,
			right : 0,
			top : 0
		});
		qaList.add(rowContainer);

		var questionView = Ti.UI.createView({
			rowId : k + "_" + i,
			backgroundColor : '#fff',
			borderColor : '#999',
			borderWidth : 1,
			height : Ti.UI.SIZE,
			left : 0,
			right : 0,
			top : 0
		});
		qaList.questionView = questionView;
		rowContainer.add(questionView);

		var questionText = Ti.UI.createLabel({
			rowId : k + "_" + i,
			text : questionObj.data[k].questions[i].question_en,
			height : Ti.UI.SIZE,
			color : '#000',
			top : 9,
			left : 9,
			right : 20,
			bottom : 9,
			font : {
				fontSize : 13,
				fontWeight : 'bold',
				fontFamily : 'Helvetica Neue'
			},
		});
		questionView.add(questionText);

		var arrowIcon = Titanium.UI.createImageView({
			rowId : k + "_" + i,
			backgroundImage : "arrow_right.png",
			width : 10,
			top : 8,
			right : 10,
			height : 15
		});
		questionView.add(arrowIcon);

		answerView[k + "_" + i] = Ti.UI.createView({
			height : 0,
			backgroundColor : '#DEE2E7',
			left : 0,
			right : 0,
			top : 0
		});
		rowContainer.add(answerView[k + "_" + i]);

		sLabel[i] = StyledLabel.createLabel({
			height : Ti.UI.SIZE || 'auto',
			top : 7,
			right : 5,
			bottom : -15,
			left : 5,
			html : '<center>Loading, please wait.</center>'
		});
		answerView[k + "_" + i].add(sLabel[i]);

		sLabel[i].addEventListener('click', function(evt) {
			if (evt.url) {
				alert('You clicked ' + evt.url);
				Ti.Platform.openURL(evt.url);
			}
		});

		var html = "";
		html += '<div style="background-color:#DEE2E7;font-family: HelveticaNeue;font-size: 13px;color: #555;">' + parseTweetToHTML(questionObj.data[k].questions[i].answer_en) + '</div>';
		sLabel[i].html = html;
	}
}

win.open();
