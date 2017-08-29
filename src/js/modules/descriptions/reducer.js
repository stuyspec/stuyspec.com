/*
TODO: The following pages redirect you to something else:
    Advertise has links to forms for advertisment
    Apparel redirects to http://specapparel.strikingly.com/
    Contact is a form
    Subscribe is also a form
    Sponsers has images
    Join Us redirects to http://www.stuyspec.com/recruiting/ which has a different page structure
    Visual Archives link have things related to issuu
 */

const initialState = {
  "our-charter": {
    id: 0,
    title: "Our Charter",
    slug: "our-charter",
    content:
      "<h1>The Charter of The Spectator</h1>" +
      "Approved September 24, 2016 by The Spectator Editorial Board.<br>" +
      "<h2>I. Statement of Purpose<br></h2>" +
      "<ol><li>The goal of The Spectator, the school newspaper of Stuyvesant High School, is to inform the Stuyvesant community, including students, teachers, administrators and parents, of the significant events and issues pertaining to the school.\n</li>" +
      "<li>The Spectator is established as a public forum for expression, and as a voice in the free and open discussion of issues for all parties. The Spectator provides a full opportunity for all groups to inquire, question and exchange ideas. Content should reflect areas of school interest, including topics about which there may be dissent or controversy. The Editors-in-Chief, with the counsel of the Faculty Advisor, will make the final content decisions for The Spectator.\n</li>" +
      "<li>All student journalists, including Editors and staff members, must follow professional standards of journalism in reporting and writing.\n</li>" +
      "<li>The Spectator is committed to remaining independent from the influence of the administration and other groups who may wish to use the newspaper to pursue their interests. This commitment chiefly includes independence from prior review by any and all groups except those with whom the Editors make an agreement to review the content in order to advise Editors on matters of style and content; these individuals will review the content of the newspaper before printing under the promise of confidentiality. Additionally, we choose to remain financially independent from the administration and Student Union in order to preserve our journalistic integrity.\n</li></ol>" +
      "<h2>II. The Spectator Staff\n</h2>" +
      "<ol><li><b>Editor in Chief</b>: In general, two Editors-in-Chief share all responsibilities noted in this charter and act as the leaders of The Spectator. However, an Editor-in-Chief and a Managing Editor may also lead The Spectator, in which case the Editor-in-Chief runs the newspaper in concert with the Managing Editor and with counsel from the Faculty Advisor, though he/she is the one who makes the final decisions on all aspects of the paper except the filling of and removal from positions. The Editor-in-Chief is held responsible for all content in the newspaper and coordinates the printing of the paper. The Editor-in-Chief and Managing Editor are in charge of running the Spectator class, and teach the class in concert with the Faculty Advisor (see Section II.H).\n</li>" +
      "<li><b>Managing Editor</b>: The Managing Editor oversees the production of the paper, oversees Department Editors and works in cooperative effort with the Editor-in-Chief to run the newspaper. The Managing Editor is responsible for running the Spectator class with the Editor-in-Chief, and teaches the class in concert with the Editor-in-Chief and Faculty Advisor (see Section II.H).\n</li>" +
      "<li><b>Managing Board</b>: The Managing Board consists of six members, including the Editor-in-Chief, Managing Editor and four Department Editors of their choice. The Managing Board advises the Editor-in-Chief and Managing Editor on all issues involving the newspaper. In cases where the Managing Board votes, at least five members must be present, including the Editor-in-Chief and Managing Editor. All votes are decided by a simple majority with the exception of removal from position (see Section III.C). The Editor-in-Chief decides in cases of a tie. If the two Editors-in-Chief cannot come to a resolution, the Editorial Board decides (see Section II.D). The Managing Board can vote to ask the administration to propose candidates to be considered for the position of Faculty Advisor. The outgoing Managing Board is encouraged to advise the incoming Editor-in-Chief and Managing Editor on selecting Editors for a new Managing Board. Additionally, the Managing Board must approve all incoming Editors. It is recommended that there be some diversity in the Managing Board with respect to the type of departments from which the chosen Editors come; both writing and non-writing departments should be represented. There are no limits on or guarantees of the term of a Managing Board member; Managing Board members will be chosen at the discretion of the Editor-in-Chief and Managing Editor.\n</li>" +
      "<li><b>Editorial Board</b>: The Editorial Board is comprised of all the Department Editors, Managers, and Directors along with the Editor-in-Chief and Managing Editor. The Editorial Board votes by a simple majority, except for the amendment of the Charter and the approval of selections of Editor-in-Chief and Managing Editor (see Section III.B). Editors-in-Training, exempting those on the Layout Department, vote along with the rest of the Editorial Board. The Editor-in-Chief and/or Managing Editor can call for a vote by the Editorial Board to decide on issues at his/her/their discretion. All members of the Editorial Board must be in the Spectator class. The Editor-in-Chief and Managing Editor can make exceptions in cases of unavoidable conflicts.  Note that only Board members who are present for Spectator class are guaranteed a vote.\n</li>" +
      "<li><b>Department Editors</b>: Each department has at least two, and at most three Editors, who are recommended for the position by outgoing Department Editors (barring those who are removed from their position) and then approved by the Managing Board. Department Editors are responsible for managing their respective staffs, editing an equal share of content from their departments as their coeditors and recruiting staff members. Outgoing department editors are responsible for training their successors.\n</li>" +
      "<li><b>Business Managers</b>: Business managers are responsible for acquiring 100% of the funds necessary for the production of the paper. Sources of revenue include but are not limited to advertisements, sponsorships, donations and general fundraisers. Business Managers are responsible for managing the influx and efflux of funds, taking care of all expenditures and deposits and managing all affairs which involve the handling of money. Trips, events, fundraisers and dinners are all planned by the Business Managers. Staff members of the Business department are recruited twice a year and undergo screening via application and interview. Staff members are also allowed to solicit advertisements and funds but only under the close supervision of the Business Managers. The finalization of all advertisement or sponsorship agreements are done between the client and Business Managers as Staff members act as a liaison for securing a deal. All aspects of acquiring funds are screened by the Business Managers. In addition to managing the financials of the paper, the Business Managers work closely with the Editors-in-Chief on the logistics and developments of the paper.\n</li>" +
      "<li><b>Editors in Training</b>: Editors-in-Training join the Spectator class in the fall in order to facilitate the transition to the new Editorial Board in the spring. These Editors-in-Training are chosen by the current Department Editors as prospective Editors, but they must be approved by the Editors-in-Chief before becoming Editors-in-Training and by the Managing Board to become Editors. Exceptions are made for the Layout Department, which selects more Editors-in-Training than can become Editors. Layout Editors-in-Training must go through the regular approval process (see Section II.E.).\n</li>" +
      "<li><b>Staff</b>: The Spectator holds a staff recruitment each fall and spring, when applicants can apply to be a member of each department of the paper. However, at Department Editors’ discretion, potential members can apply to a department at any time during the year. Department membership will be regulated by the respective Department Editors. As student journalists, every member of The Spectator must abide by the same journalistic standards to which the paper’s Editors are held; it is the Editors’ responsibility to inform their staff members of these relevant standards.\n</li>" +
      "<li><b>Faculty Advisor</b>: The Editorial Board consults the Faculty Advisor on matters involving the newspaper. The Faculty Advisor gives guidance to the students on libel and journalistic ethics, balance and objectivity, taste and writing style. The Faculty Advisor must teach the Spectator class in concert with the Editor-in-Chief and Managing Editor (see Sections II.A and II.B). It is recommended that the Faculty Advisor be from the English Department, but he/she can be from any department.\n</li></ol>" +
      "<h2>III. Operating Procedures\n</h2>" +
      "<ol><li><b>Production of the Newspaper</b>: Department Editors will first determine Pasteup for each issue, assigning the writing and reporting of articles, the taking of photographs, drawing of artwork, or the soliciting of ads. Department Editors will complete one round of edits for their respective media (articles and photographs). Next, the Editors-in-Chief will edit all articles. Exceptions can be made for time-sensitive articles or articles that are deemed complete by the Editors-in-Chief. After the writer has addressed both the Editors-in-Chief’s and the Department Editor’s comments, the Department Editor and Editors-in-Chief will make final changes before sending the article to the Copy Department. Copy will edit the articles for grammar and style but not content, fact-check them and send them, after editing, to the Layout Department. The Faculty Advisor will review articles before they are printed or put on the website. The Layout Department will begin laying out the paper a few days before the sending date, and the Editors-in-Chief will work with the Layout Editors to complete the paper. The Business Managers are in charge of deciding which advertisements will be placed in each issue.\n</li>" +
      "<li><b>Procedure for Approving the Incoming Editor in Chief and Managing Editor</b>:  All non-outgoing Editors and Editors-in-Training can apply for either or both positions.  In order to serve as Editor in Chief, an applicant must be committed to serving two terms.  Applicants will not be included in any of the discussions regarding the choosing of new Editors-in-Chief. The Editorial Board will spend a few class days in the end of the Fall semester discussing the applicants. At the end of these discussions, the Editorial Board will vote on pairs of applicants, and narrow down the potential pairings to two. The graduating members of the Editorial Board will discuss the final two pairings and then vote on them. A simple majority will determine the next semester’s Editors-in-Chief.\n</li>" +
      "<li><b>Removal From Position</b>: All concerns regarding Editors not performing their duties adequately should be taken to the Editor-in-Chief and Managing Editor. If they deem the case worthy of further attention, they can present the case to the Managing Board. If the Managing Board decides that the case should be furthered, it can hold a vote; if a two-thirds majority is obtained there, the matter moves on to the Editorial Board. If a two-thirds majority is obtained there, the removal from position is approved. The Editor in question may not be present during the vote. The removed Editor can appeal to the Faculty Advisor, who will act as a neutral party by presenting the facts of the case to the Editorial Board. The Editor in question will be present during the presentation of the case. If the Editor in question is the Editor-in-Chief or Managing Editor, concerns can be brought up to the other one of the two, who can convene the Managing Board in absence of the member in question; the previously stated procedures then follow. If the concern is about both the Editor-in-Chief and Managing Editor, it will be brought to the Faculty Advisor, who can convene the Managing Board without their presence; the previously stated procedures then follow. To remove an Editor who is on the Managing Board, a two-thirds vote of the remaining members of the Managing Board is needed. The Faculty Advisor may not remove any Editor from his/her position and may not select new Editors.\n</li>" +
      "<li><b>Approval and Removal of Faculty Advisor</b>: There are two cases in which The Spectator will consider candidates for the position of Faculty Advisor: if, under extenuating circumstances, that position is vacated, or if the Editorial Board decides that it is dissatisfied with the current holder of that position. In both cases, the Managing Board will consider the candidate(s) proposed by the school administration and vote on them. If a candidate receives a two-thirds majority, he/she will be brought to the Editorial Board for consideration; if a simple majority is obtained there, the candidate is approved as the new Faculty Advisor and replaces any current holder of that position.\n" +
      "<li><b>Approval of a New Editor in Case of Resignation or Removal from Position</b>: If an Editor vacates his/her position for any reason, the other Editor for that department will nominate a member of The Spectator staff to replace him/her. The Managing Board must approve this new Editor.\n</li>" +
      "<li><b>Changeover Period</b>: Between the Fall and Spring semesters, the incoming Editors will replace the outgoing Editors. First, the incoming Editor-in-Chief and Managing Editor, chosen under Section III. A, will replace the outgoing holders of those positions for one issue. The rest of the incoming Editors will replace their outgoing counterparts in the next issue. It is the outgoing Editors’ responsibility to train those who are to take over their positions.\n</li>" +
      "<li><b>Endorsements</b>: The Spectator may endorse candidates for the Student Union elections. After the primaries, the Managing Board interviews each candidate for the positions of Student Union President and Vice President, Senior Caucus, Junior Caucus, Sophomore Caucus and Freshman Caucus, and presents the results to the Editorial Board. The Editorial Board may then pick one set of candidates for each of these positions, print the candidates it endorses and explain its choices.\n</li>" +
      "<li><b>Appellate Procedures</b>: Any person who wishes to appeal any action or decision of The Spectator should take his/her case to the Managing Board. The Managing Board deals with all appeals or objections to decisions or actions of The Spectator, except removal from position, in which all appeals should be made to the Faculty Advisor.\n</li>" +
      "<li><b>Amendment of the Charter</b>: Amendment of the charter requires a two-thirds majority vote of the Editorial Board.\n</li></ol>" +
      "<h2>IV. Policies & Guidelines\n</h2>" +
      "<h3>A. Ethics\n</h3>" +
      "<ol><li>As an agent of the free press, The Spectator will act in accordance with First Amendment principles.\n</li>" +
      "<li>The Spectator will treat all people with respect and will not demean individuals on the basis of age, race, religion, gender, sexual orientation or mental/physical disabilities.\n</li>" +
      "<li>The Spectator will explain to readers its journalistic processes when necessary and will be fair in its relations with all parties.\n</li>" +
      "<li>Reporters can grant sources anonymity for matters that demand the public’s right to know only as a last resort. Reporters should interview at least one other  anonymous source to confirm the validity of information obtained from them.\n</li>" +
      "<li>Reporters must be clear with their sources about what is on the record and what is off the record. The Spectator will not publish information obtained off the record.\n</li>" +
      "<li>The Spectator will strive to be accessible to its readers. The newspaper will be free for the Stuyvesant community, except in the case of subscriptions.\n</li></ol>" +
      "<h3>B. Content Policy\n</h3>" +
      "<ol><li>The Spectator will report the news accurately, thoroughly and in an unbiased way, using honest methods to gather news. The Editors will hold factual information in opinion columns and editorials to the same standards of accuracy as news stories.\n</li>" +
      "<li>The Spectator will hold itself responsible for all that is printed.\n</li>" +
      "<li>The Spectator will not publish any material for which there is evidence that the author, on or off the staff, is using the paper to that writer’s personal ends.\n</li>" +
      "<li>The Spectator does not accept or publish everything it receives from interested contributors. The Editor-in-Chief and Managing Editor will determine when such materials will be printed.\n</li>" +
      "<li>Any staffer may write commentary; that writer’s byline indicates that the opinions expressed are the writer’s own.\n</li>" +
      "<li>Staff Editorials are unsigned and reflect the opinion of the Editorial Board.\n</li>" +
      "<li>The Spectator will attempt to ascertain all possible story ideas for each issue, but it will select story ideas for coverage based on standard values of newsworthiness.\n</li>" +
      "<li>No cartoons, art or photographs that editorialize may appear on News/Features pages.\n</li>" +
      "<li>The Spectator constitutes plagiarism to be any instance in which a member of staff attempts to publish at least one full sentence of someone else’s writing without proper citation as their own.\n</li>" +
      "<li>If a staff member has been caught plagiarizing, he or she will be able to remain on The Spectator and will be given a warning, the content of which is up to the Department Editors’ discretion. If this person is caught plagiarizing again, he or she will be asked to leave The Spectator immediately.\n</li></ol>" +
      "<h3>C. Maintaining Independence\n</h3>" +
      "<ol><li>The Spectator will remain free of outside interests, investments or business relationships that may compromise the credibility of its news reporting.\n</li>" +
      "<li>No group outside The Spectator except the Faculty Advisor and those who advise the Editorial Board on issues of content and style under the agreement of confidentiality will review the newspaper prior to its release to the public. The Spectator will not tolerate any threats by the administration to withhold the newspaper from publication. In the case of these threats, the Editor-in-Chief and Managing Editor will approach the administration and settle the situation.\n</li>" +
      "<li>We will not permit any source who demands to read the reporter’s completed story before publication or perform editing tasks on the story to do so under any circumstances. However, the source may review the direct quotes used in the article to ensure that they are accurate.\n</li></ol>" +
      "<h3>D. Corrections Policy\n</h3>" +
      "<ol><li>All factual errors, including misidentifications and misspellings of names and titles, must be corrected. The Corrections Box is a reflection of the integrity of the newspaper.\n</li>" +
      "<li>It is recommended that the Corrections Box be placed on the Editorial page, along with the masthead, under a suitable heading.\n</li>" +
      "<li>The Editors-in-Chief are responsible for corrections.\n</li>" +
      "<li>If an article published on the website is corrected, the fact that it was updated must be clear to a reader.\n</li></ol>" +
      "<h3>E. Letters Policy\n</h3>" +
      "<ol><li>The Spectator encourages Letters to the Editor so that readers may participate in a scholastic free press in an open forum.\n</li>" +
      "<li>The Spectator will not print anonymous Letters to the Editor.\n</li>" +
      "<li>The Editorial Board will choose letters for publication on the basis of timeliness and potential reader interest.\n</li>" +
      "<li>The Spectator reserves the right to edit letters for length, appropriateness and grammatical correctness without altering meaning.\n</li></ol>" +
      "<h3>F. Independence from the Student Union\n</h3>" +
      "<ol><li>Editors of The Spectator cannot run for or hold the positions of Student Union President or Vice President, Senior Caucus President or Vice President, Junior Caucus President or Vice President, Sophomore Caucus President or Vice President, or Freshman Caucus President or Vice President. Editors may not apply to hold or hold major Student Union positions or be members of the Student Union cabinet.\n</li>" +
      "<li>Staff members of The Spectator may hold a position in the Student Union but may not be involved with newspaper content that involves the Student Union.\n</li></ol>" +
      "<h3>G. Conflicts of Interest\n</h3>" +
      "<ol><li>Staffers must not write non-Opinions articles on their own teachers or on activities in which they are involved.\n</li>" +
      "<li>A student who writes an article about a teacher he or she may have in the future does so at his/her own discretion. If a writer requests to be removed from a story for this reason, his/her Editor must honor that request.\n</li>" +
      "<li>Editors and staff members must not be mentioned or quoted in articles or appear in photographs in which they have little importance.\n</li>" +
      "<li>Staff writers must not interview their friends for an article in which they have little importance.\n</li>" +
      "<li>Editors may not campaign for candidates in Student Union elections.\n</li>" +
      "<li>If the Editorial Board is writing a Staff Editorial about a Stuyvesant organization that a member of the Editorial Board is a prominent member of, this person cannot be present during the Staff Editorial discussion.\n</li></ol>" +
      "<h3>H. Grounds for Removal from Position\n</h3>" +
      "<ol>If an Editor shows significant signs of inadequacy in his/her position for any reason, including being unable to handle his/her work, leaking sensitive information, condoning plagiarism or failure to follow the guidelines set forth in the Charter, his/her position will be reconsidered as per the guidelines set forth under §III.C.\n</ol>" +
      "<h3>I. Obituary Policy\n</h3>" +
      "<ol>The Spectator will cover stories involving the death of current students, administration and alumni, including photographs, when possible, and relevant facts concerning the death.\n</ol>" +
      "<h3>J. Reporting on Crime\n</h3>" +
      "<ol><li>If a student or faculty member is accused of a crime, The Spectator will report on it based on accepted professional protocol.\n</li>" +
      "<li>The names of all accused individuals 18 years or older will be included in the story, regardless of whether that individual is a teacher, student, administrator, etc.\n</li>" +
      "<li>The name of any student under 18 years old who is being tried as an adult in the court system will be included in the story.\n</li>" +
      "<li>A student under 18 years old who is being tried as a minor will have his/her name omitted from the story.\n</li>" +
      "<li>Should a student be subjected to disciplinary action by the administration of Stuyvesant High School, The Editorial Board will decide on a case-by-case basis whether to include that student’s name.\n</li>" +
      "<li>When possible, alleged victims of crimes that do not carry a stigma, such as robbery, will be interviewed and their names will be included.\n</li>" +
      "<li>The names of victims of alleged crimes that carry a stigma, such as rape and sexual assault, will be withheld.\n</li>" +
      "<li>Reporters will treat all individuals involved in criminal proceedings with sensitivity and compassion.\n</li></ol>" +
      "<h3>K. Advertisements Policy\n</h3>" +
      "<ol><li>The Spectator reserves the right to turn away any advertisements at the discretion of the Business Managers.\n</li>" +
      "<li>The Spectator does not necessarily endorse the advertisements that appear in its issues.\n</li>" +
      "<li>The Spectator will be clear in differentiating advertisements from articles.\n</li>" +
      "<li>Advertisements are not placed on Opinions or Humor pages. Exceptions can be made if Humor is 1 ½ pages, at the discretion of the Business Managers.\n</li></ol>" +
      "<center>---</center><br>" +
      'If you have any comments, questions, concerns, or suggestions regarding this webpage or concerning The Spectator in general, please fill out a contact form or e-mail us directly at <a href="mailto:web@stuyspec.com">web@stuyspec.com\n</a><br><br>' +
      "Please be aware that this webpage is currently a work in progress. We are still working to implement new features and update content. If you have access to past content that you believe should be on this site or know someone who does, please do not hesitate to contact us through the resources mentioned above. We sincerely apologize for any past work that is missing or lacks proper credit, and implore you to email us with any information you believe would assist in resolving this.</p><br>",
  },
  advertise: {
    id: 1,
    title: "Advertise",
    slug: "advertise",
    content:
      "<p><h2>Local Advertising\n</h2>" +
      '<ul>Local advertisers are classified as all those companies either headquartered within New York City or whose New York City local branch is placing an advertisement.The best way to contact an advertising representative is to <a href="mailto:specbusiness@gmail.com">e-mail the business manager</a>. For information on rates and our publication schedule, please see the advertising forms below.\n</ul>' +
      "<h2>National Advertising\n</h2>" +
      "<ul>Please direct all national advertising orders and questions to our business desk:\n<br><br>" +
      '<pre><b>Email</b>: <a href="mailto:specbusiness@gmail.com">business@stuyspec.com</a></pre><br>' +
      "<pre><b>Fax</b>: 212-587-3874, attn. The Spectator\n</pre><br>" +
      "<pre><b>Phone</b>: 212-312-4800 ext. 2601\n</pre/><br></ul>" +
      "<h2>Student Groups\n</h2>" +
      '<ul>All Clubs and Pubs are offered discounted advertising rates in The Spectator! In order to place an ad, a representative (a president or cabinet member) must email <a href="mailto:specbusiness@gmail.com">business@stuyspec.com</a> with the following things:\n' +
      "<ul><li>Group Name\n</li>" +
      "<li>Size of ad requested\n</li>" +
      "<li>The date they would like the advertisement to appear\n</li>" +
      "<li>A digital copy of the ad in JPG or PDF format\n</li></ul>" +
      'Large ad sizes are available. Please contact <a href="mailto:specbusiness@gmail.com">business@stuyspec.com</a> for more details.\n</ul>' +
      "<h2>Contact Business Directly\n</h2>" +
      "<ul><b>Manager</b>: Donia Tung\n<br>" +
      "<b>Phone</b>: 646.314.2289\n<br>" +
      "<b>Email</b>: dtung@stuy.edu\n<br><br>" +
      "<b>Manager</b>: Saloni Majmudar\n<br>" +
      "<b>Phone</b>: 646.628.0139\n<br>" +
      "<b>Email</b>: smajmudar@stuy.edu</p><br></ul> ",
  },
  sponsors: {
    id: 2,
    title: "Sponsors",
    slug: "sponsors",
    content:
      "<p>Mystery Room NYC LogoMystery Room NYC is an escape the room game in which players assume the role of a detective that is trapped and needs to figure out what transpired in the space before they arrived. Teams must work together to uncover clues and piece together components in order to escape. The game is released in chapters and while you don’t have to play each part in order, playing all the chapters allow you to gain greater knowledge of the overall backstory behind each of the rooms, unveiling the mystery.\n<hr>" +
      "<h2>Become A Sponsor\n</h2>" +
      'If you are interested in sponsoring <i>The Spectator</i> to help preserve the tradition of excellence our publication has established heretofore, please contact the business managers at <a href="mailto:specbusiness@gmail.com">business@stuyspec.com</a>. For benefits of sponsorship, please see the below document.</p><br>' +
      '<center><iframe style="width:500px; height:647px;" src="//e.issuu.com/embed.html#30896636/52588541" frameborder="0" allowfullscreen></iframe></center><br>',
  },
  apparel: {
    id: 3,
    title: "Apparel",
    slug: "apparel",
    content:
      '<p><center><a href="http://specapparel.strikingly.com/">Apparel Page</a></center></p><br>',
  },
  staff: {
    id: 4,
    title: "Staff",
    slug: "staff",
    content:
      "<p><h2><center>Members of the 2017-2018 Spectator Editorial Board\n</center></h2><br>" +
      "<center><b>Editors In Chief</b><br>Anne George<br>Matteo Wong<br><br>" +
      "<b>News Editors</b><br>Nishmi Abeyweera<br>Shameek Rakshit<br>Blythe Zadrozny<br><br>" +
      "<b>Features Editors</b><br>Archi Das<br>Asim Kapparova<br>Sophie Watwood<br><br>" +
      "<b>Opinions Editors</b><br>Jame Rhee<br>Eliza Spinna<br><br>" +
      "<b>Sports Editors</b><br>Ray Jones<br>Sam Merrick<br>Max Onderdonk<br><br>" +
      "<b>Humor Editors</b><br>Kerwin Chen<br>Shaina Peters<br>Michael Xu<br><br>" +
      "<b>Photography Editors</b><br>Julia Lee<br>Mika Simoncelli<br><br>" +
      "<b>Arts & Entertainment Editors</b><br>Karen Chen<br>Sophie Feng<br>Eliana Kavouriadis<br><br>" +
      "<b>Art Directions</b><br>Klaire Geller<br>Christine Jegarl<br>Vivian Lin<br><br>" +
      "<b>Layout Editors</b><br>Arpita Nag<br>Jessica Wu<br>Katie Wu<br><br>" +
      "<b>Copy Editors</b><br>Vincent Jiang<br>Michelle Lai<br>Venus Nnadi<br><br>" +
      "<b>Business Manager</b><br>Saloni Majmudar<br>Donia Tung<br><br>" +
      "<b>Web Editors</b><br>Jason Kao<br>George Zheng<br><br>" +
      "<b>Faculty Advisor</b><br>Kerry Garfinkel</center><br>",
  },
  contact: {
    id: 5,
    title: "Contact",
    slug: "contact",
    content:
      '<p><center>Contact us at <a href="mailto:anneandmatteo@gmail.com">anneandmatteo@gmail.com</a></center></p><br>',
  },
  subscribe: {
    id: 6,
    title: "Subscribe",
    slug: "subscribe",
    content:
      "<p><i><center>Get breaking news, notifications and alerts right in your inbox.</center></i></p><br>",
  },
  "join-us": {
    id: 7,
    title: "Join Us",
    slug: "join-us",
    content:
      '<p><center><a href="http://www.stuyspec.com/recruiting/">Join Us</a><br></center></p>',
  },
  "visual-archives": {
    id: 8,
    title: "Visual Archives",
    slug: "visual-archives",
    content:
      '<p><center>To see all of our available issues in PDF form, head <a href="https://issuu.com/stuyspectator">here!</a></center><br></p>',
  },
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
