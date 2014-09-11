 function validateEmail(email) { 
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function show_login_popup ($scope,$http) {
    show_popup();
    $scope.login = true;
    $scope.registration = false;
}
function show_registration_popup ($scope,$http) {
      show_popup();
      $scope.login = false;
      $scope.registration = true;
}

function show_loader(){
    $('#overlay').css('display', 'block');
    $('.spinner').css('display', 'block');
}
function hide_loader(){
    $('#overlay').css('display', 'none');
    $('.spinner').css('display', 'none');
}
function user_login ($scope,$http){

    $scope.login_validation = function (){
    if ($scope.username == '' || $scope.username == undefined) {
          $scope.login_validation_message = 'Please enter email';
          return false;
      }else if ($scope.password == '' || $scope.password == undefined) {
          $scope.login_validation_message = 'Please enter password';
          return false;
      }return true;
    }
    if($scope.login_validation()){
      show_loader();
      $scope.login_details.username = $scope.username;
      $scope.login_details.password = $scope.password;
      params = {
          'login_details': angular.toJson($scope.login_details),
          'csrfmiddlewaretoken': $scope.csrf_token,
      }
      $http({
          method : 'post',
          url : "/web/login/",
          data : $.param(params),
          headers : {
              'Content-Type' : 'application/x-www-form-urlencoded'
          }
      }).success(function(data, status) {
          if (data.result == 'recruiter') {
            document.location.href = '/employer/employer_profile/';
          }else if(data.result == 'jobseeker'){
            document.location.href = '/jobseeker/jobseeker_details/';
          }else if(data.result == 'admin'){
            document.location.href = '/admin_dashboard/';
          }else if(data.result == 'error'){
            $scope.login_validation_message = data.message;
          }
          hide_loader();
      });
    }

  }

function hide_popup($scope,$http) {
    hide_popup();
    $scope.username = '';
    $scope.password = '';
  }
function search_by_location(search_type){
  if (search_type == 'location') {
    var url = '/jobseeker/search_job/?location=location';
    document.location.href = url;
  }
  if (search_type == 'skills') {
    var url = '/jobseeker/search_job/?skills=skills';
    document.location.href = url;
  }
  
}

function search_by_skills(search_type){
  if (search_type == 'skills') {
    var url = '/jobseeker/search_job/?skills=skills';
    document.skills.href = url;
  }
}

function search_by_function(search_type){
  if (search_type == 'function') {
    var url = '/jobseeker/search_job/?function=function';
    document.function.href = url;
  }
}

function search_by_industry(search_type){
  if (search_type == 'industry') {
    var url = '/jobseeker/search_job/?industry=industry';
    document.industry.href = url;
  }
}

function show_popup(){
  $('#overlay').css('display', 'block');
  $('#dialogue_popup_container').css('display', 'block');
}
function hide_popup(){
  $('#overlay').css('display', 'none');
  $('#dialogue_popup_container').css('display', 'none');
}

function validation($scope) {

    if ($scope.skill == '' || $scope.skill == undefined) {
        $scope.is_keyword = true;
        $scope.is_location = false;
        $scope.is_exp = false;
        $scope.is_function = false;
        return false;
    } else if ($scope.job_location == '' || $scope.job_location ==undefined) {
        $scope.is_location = true;
        $scope.is_keyword = false;
        $scope.is_exp = false;
        $scope.is_function = false;
        return false;
    } else if ($scope.experience == 'select') {
        $scope.is_exp = true;
        $scope.is_location = false;
        $scope.is_keyword = false;
        $scope.is_function = false;
        return false;
    } else if ($scope.functional_area == 'select') {
        $scope.is_function = true;
        $scope.is_keyword = false;
        $scope.is_location = false;
        $scope.is_exp = false;
        return false;
    }
    return true;
}

function search_job($scope, search_option) {
    if (search_option) {
        $scope.error_flag = false;
        $scope.error_message = '';
        if(search_option == 'location') {
            if (($scope.search.location == '' || $scope.search.location == undefined)) {
                $scope.error_flag = true;
                $scope.error_message = 'Please enter value for the location';
                
            }  else {
                $scope.error_flag = false;
                $scope.error_message = '';
                var url = '/jobseeker/job_search/?location='+$scope.search.location;
                document.location.href = url;
            }
        } else if (search_option == 'skills') {
            if (($scope.search.keyword == '' || $scope.search.keyword == undefined)) {
                $scope.error_flag = true;
                $scope.error_message = 'Please enter value for the skills';
                
            }  else {
                $scope.error_flag = false;
                $scope.error_message = '';
                var url = '/jobseeker/job_search/?skills='+$scope.search.keyword;
                document.location.href = url;
            }
        } else {
            if (($scope.search.keyword == '' || $scope.search.keyword == undefined) && ($scope.search.location == '' || $scope.search.location == undefined) && ($scope.search.experience == '' || $scope.search.experience == undefined) && ($scope.search.function_name == '' || $scope.search.function_name == undefined)) {
                $scope.error_flag = true;
                $scope.error_message = 'Please enter value for the any of the criteria';
                $scope.alert_style = {border: '1px solid #FF0000'};
                
            }  else {
                $scope.alert_style = {};
                $scope.error_flag = false;
                $scope.error_message = '';
                var url = '/jobseeker/job_search/?location='+$scope.search.location+'&skills='+$scope.search.keyword+'&experience='+$scope.search.experience+'&function='+$scope.search.function_name+'&industry='+$scope.search.industry+'&search=true';
                document.location.href = url;
            }
        }
        
    } else {
      $scope.is_valid = validation($scope);
      if ($scope.is_valid) {
          $scope.is_keyword = false;
          $scope.is_location = false;
          $scope.is_exp = false;
          $scope.is_function = false;
          var url = '/jobseeker/job_search/?location='+$scope.job_location+'&skills='+$scope.skill+'&experience='+$scope.experience+'&function='+$scope.functional_area;
          document.location.href = url;
      }
    }
    
}

function get_countries($scope){
    $scope.countries = [
          'Afghanistan',
          'Albania',
          'Algeria',
          'American Samoa',
          'Andorra',
          'Angola',
          'Antarctica',
          'Antigua and Barbuda',
          'Argentina',
          'Armenia',
          'Aruba',
          'Australia',
          'Austria',
          'Azerbaijan',
          'Bahamas',
          'Bahrain',
          'Bangladesh',
          'Barbados',
          'Bassas da India',
          'Belarus',
          'Belgium',
          'Belize',
          'Benin',
          'Bhutan',
          'Bolivia',
          'Bosnia and Herzegovina',
          'Botswana',
          'Bouvet Island',
          'Brazil',
          'Brunei',
          'Bulgaria',
          'Burkina Faso',
          'Burma',
          'Burundi',
          'Cambodia',
          'Cameroon',
          'Canada',
          'Cape Verde',
          'Central African Republic',
          'Chad',
          'Chile',
          'China',
          'Colombia',
          'Comoros',
          'Democratic Republic of the Congo',
          'Republic of the Congo',
          'Costa Rica',
          "Cote d'Ivoire",
          'Croatia',
          'Cuba',
          'Cyprus',
          'Czech Republic',
          'Denmark',
          'Djibouti',
          'Dominica',
          'Dominican Republic',
          'Ecuador',
          'Egypt',
          'El Salvador',
          'Equatorial Guinea',
          'Eritrea',
          'Estonia',
          'Ethiopia',
          'Fiji',
          'Finland',
          'France',
          'French Southern and Antarctic Lands',
          'Gabon',
          'Gambia',
          'Gaza Strip',
          'Georgia',
          'Germany',
          'Ghana',
          'Greece',
          'Grenada',
          'Guatemala',
          'Guinea',
          'Guinea-Bissau',
          'Guyana',
          'Haiti',
          'Holy See (Vatican City)',
          'Honduras',
          'Hong Kong (China)',
          'Hungary',
          'Iceland',
          'India',
          'Indonesia',
          'Iran',
          'Iraq',
          'Ireland',
          'Israel',
          'Italy',
          'Jamaica',
          'Japan',
          'Jordan',
          'Kazakhstan',
          'Kenya',
          'Kiribati',
          'Korea, North',
          'Korea, South',
          'Kuwait',
          'Kyrgyzstan',
          'Laos',
          'Latvia',
          'Lebanon',
          'Lesotho',
          'Liberia',
          'Libya',
          'Liechtenstein',
          'Lithuania',
          'Luxembourg',
          'Macau (China)',
          'Macedonia',
          'Madagascar',
          'Malawi',
          'Malaysia',
          'Maldives',
          'Mali',
          'Malta',
          'Marshall Islands',
          'Mauritania',
          'Mauritius',
          'Mexico',
          'Federated States of Micronesia',
          'Moldova',
          'Monaco',
          'Mongolia',
          'Morocco',
          'Mozambique',
          'Namibia',
          'Nauru',
          'Nepal',
          'Netherlands',
          'Netherlands Antilles',
          'New Zealand',
          'Nicaragua',
          'Niger',
          'Nigeria',
          'Norway',
          'Oman',
          'Pakistan',
          'Palau',
          'Panama',
          'Papua New Guinea',
          'Paraguay',
          'Peru',
          'Philippines',
          'Poland',
          'Portugal',
          'Qatar',
          'Reunion',
          'Romania',
          'Russia',
          'Rwanda',
          'Saint Kitts and Nevis',
          'Saint Lucia',
          'Saint Vincent and the Grenadines',
          'Samoa',
          'San Marino',
          'Sao Tome and Principe',
          'Saudi Arabia',
          'Senegal',
          'Serbia',
          'Seychelles',
          'Sierra Leone',
          'Singapore',
          'Slovakia',
          'Slovenia',
          'Solomon Islands',
          'Somalia',
          'South Africa',
          'Spain',
          'Sri Lanka',
          'Sudan',
          'Suriname',
          'Svalbard',
          'Swaziland',
          'Sweden',
          'Switzerland',
          'Syria',
          'Taiwan',
          'Tajikistan',
          'Tanzania',
          'Thailand',
          'Togo',
          'Tonga',
          'Trinidad and Tobago',
          'Tunisia',
          'Turkey',
          'Turkmenistan',
          'Tuvalu',
          'Uganda',
          'Ukraine',
          'United Arab Emirates',
          'United Kingdom',
          'United States',
          'Uruguay',
          'Uzbekistan',
          'Vanuatu',
          'Venezuela',
          'Vietnam',
          'West Bank',
          'Western Sahara',
          'Yemen',
          'Zambia',
          'Zimbabwe ', 
          'Other',
    ]
}

function get_basic_education($scope){
    $scope.basic_education = [
        'Diploma',
        'Intermediate Schooling',
        'Secondary Schooling',
        'Bachelor of Architecture',
        'Bachelor of Arts',
        'Bachelor of Business Administration',
        'Bachelor of Commerce'  ,
        'Bachelor of Dental Sugery' ,
        'Bachelor of Education' ,
        'Bachelor of Hotel Management'  ,
        'Bachelor of Laws (LLB)'    ,
        'Bachelor of Pharmacy'  ,
        'Bachelor of Science'   ,
        'Bachelor of Technology/Engineering'    ,
        'Bachelor of Vetirenary Science'    ,
        'Bachelor of Computer Application'  ,
        'MBBS',        
        'Other',
    ]
}

function get_basic_education_specialization($scope){
    $scope.basic_education_specialization = {

      'Intermediate Schooling': [
          'General (College Proprietary)',
          'Other',
      ],

      'Secondary Schooling': [
          'Academic / General',
          'Commercial',
          'Technical',
          'Vocational',
          'Religion',
          'Other',
      ],

      'Diploma': [
          'Aircraft Maintenance',
          'Architecture',
          'Autoclave Operation',
          'Cement Technology',
          'Chemical',
          'Civil',
          'Computers</option>Construction Technology',
          'Drilling & Exploration Technology',
          'Electrical',
          'Electronics',
          'Engineering',
          'Export/Import',
          'Fashion Designing/Other Designing',
          'Foundry & Forging',
          'Graphic/ Web Designing',
          'Hotel Management',
          'Instrumentation & Control',
          'Insurance',
          'Jewelery Design & Manufacturing',
          'Machine Tool Maintenance & Repair',
          'Management',
          'Mechanical',
          'Medical Instrumentation',
          'Medical Lab Technology',
          'Petrochemical Technology',
          'Process Instrumentation',
          'Production Technology',
          'Refinery & Petro Chemical Technology',
          'Refrigeration & Airconditioning',
          'Surface Coating Technology',
          'Survey Engineering',
          'Telecommunication',
          'Tool & Die Technology',
          'Tourism',
          'Videography',
          'Visual Arts',
          'Vocational Course',
          'Welding Technology',
          'Other',
      ],

      'Bachelor of Architecture': [
          'Architecture',
      ],

      'Bachelor of Arts': [

          'Arabic',
          'Arts&Humanities',
          'Communication',
          'Economics',
          'English',
          'Film',
          'Fine arts',
          'Hindi',
          'History',
          'Journalism',
          'Middle Eastern Studies',
          'Political Science',
          'PR/Advertising',
          'Psychology',
          'Religion',
          'Sociology',
          'Statistics',
          'Urdu',
          'Vocational Course',
          'Other',
      ],

      'Bachelor of Business Administration': [
          'Management',
      ],

      'Bachelor of Commerce'  : [
          'Commerce',
      ],

      'Bachelor of Dental Sugery' : [

          'Dentistry',
      ],

      'Bachelor of Education' : [
          'Education',
          'Religious Education',
      ],

      'Bachelor of Hotel Management'  : [
          'Hotel Management',
      ],

      'Bachelor of Laws (LLB)'    : [
          'Law',
      ],

      'Bachelor of Pharmacy'  : [
          'Pharmacy',
      ],

      'Bachelor of Science'   : [
          'Agriculture',
          'Anthropology',
          'Bio-Chemistry',
          'Biology',
          'Botany',
          'Chemistry',
          'Computers',
          'Dairy',
          'Technology',
          'Electronics',
          'Environmental science',
          'Food Technology',
          'Geology',
          'Home Science',
          'Maths',
          'Microbiology',
          'Nursing',
          'Physics',
          'Statistics',
          'Zoology',
          'General',
          'Other',
      ],

      'Bachelor of Technology/Engineering' : [
          'Agriculture',
          'Automobile',
          'Aviation',
          'Bio-Chemistry',
          'Bio-Technology',
          'Biomedical',
          'Ceramics',
          'Chemical',
          'Civil',
          'Computers',
          'Electrical',
          'Electronics/Telecomunication',
          'Energy',
          'Environmental',
          'Instrumentation',
          'Marine',
          'Mechanical',
          'Metallurgy',
          'Mineral',
          'Mining',
          'Nuclear',
          'Paint/Oil',
          'Petroleum',
          'Plastics',
          'Production/Industrial',
          'Textile',
          'Other Engineering',
      ],

      'Bachelor of Vetirenary Science': [
          'Veterinary Sciences',
      ],

      'Bachelor of Computer Application'  : [
          'Computers',
      ],

      'MBBS': [

          'Medicine',
      ],
  }
}

function get_masters_education($scope){
    $scope.masters_education = [
        'Chartered Accountant',
        'CA Inter',
        'Chartered Financial Analyst',
        'Company Secretary',
        'Doctor of Medicine (MD)',
        'Doctor of Surgery (MS)',
        'Inst. of Cost & Works Accountants',
        'ICWA Inter',
        'Master of Architecture',
        'Master of Arts',
        'Master of Commerce',
        'Master of Education',
        'Master of Laws (LLM)',
        'Master of Pharmacy',
        'Master of Technology/Engineering',
        'Master of Vetirenary Science',
        'Master of Computer Application',
        'MBA/PG Diploma in Business Mgmt ',
        'Other',
    ]
}
function get_country_code($scope){
  $scope.country_code = {
    'Afghanistan': ['93'],
    'Albania': ['355'],
    'Algeria': ['213'],
    'American Samoa': ['1684'],
    'Andorra': ['376'],
    'Angola': ['244'],
    'Antarctica': ['672'],
    'Antigua and Barbuda': ['1268'],
    'Argentina': ['54'],
    'Armenia': ['374'],
    'Aruba': ['297'],
    'Australia': ['61'],
    'Austria': ['43'],
    'Azerbaijan': ['994'],
    'Bahamas': ['1242'],
    'Bahrain': ['973'],
    'Bangladesh': ['880'],
    'Barbados': ['1246'],
    'Belarus': ['375'],
    'Belgium': ['32'],
    'Belize': ['501'],
    'Benin': ['229'],
    'Bhutan': ['975'],
    'Bolivia': ['591'],
    'Bosnia and Herzegovina': ['387'],
    'Botswana': ['267'],
    'Bouvet Island': ['61'],
    'Brazil': ['55'],
    'Brunei': ['672'],
    'Bulgaria': ['359'],
    'Burkina Faso': ['226'],
    'Burma': ['95'],
    'Burundi': ['257'],
    'Cambodia': ['855'],
    'Cameroon': ['237'],
    'Canada': ['1'],
    'Cape Verde': ['238'],
    'Central African Republic': ['236'],
    'Chad': ['235'],
    'Chile': ['56'],
    'China': ['86'],
    'Colombia': ['57'],
    'Comoros': ['269'],
    'Democratic Republic of the Congo': ['243'],
    'Republic of the Congo': ['242'],
    'Costa Rica': ['506'],
    "Cote d'Ivoire": ['225'],
    'Croatia': ['385'],
    'Cuba': ['53'],
    'Cyprus': ['357'],
    'Czech Republic': ['420'],
    'Denmark': ['45'],
    'Djibouti': ['253'],
    'Dominica': ['1767'],
    'Dominican Republic': ['1809'],
    'Ecuador': ['593'],
    'Egypt': ['20'],
    'El Salvador': ['503'],
    'Equatorial Guinea': ['240'],
    'Eritrea': ['291'],
    'Estonia': ['372'],
    'Ethiopia': ['251'],
    'Fiji': ['679'],
    'Finland': ['358'],
    'France': ['33'],
    'French Southern and Antarctic Lands': ['262'],
    'Gabon': ['241'],
    'Gambia': ['220'],
    'Gaza Strip': ['970'],
    'Georgia': ['995'],
    'Germany': ['49'],
    'Ghana': ['233'],
    'Greece': ['30'],
    'Grenada': ['1473'],
    'Guatemala': ['502'],
    'Guinea': ['224'],
    'Guinea-Bissau': ['245'],
    'Guyana': ['592'],
    'Haiti': ['509'],
    'Holy See (Vatican City)': ['379'],
    'Honduras': ['504'],
    'Hong Kong (China)': ['852'],
    'Hungary': ['36'],
    'Iceland': ['354'],
    'India': ['91'],
    'Indonesia': ['62'],
    'Iran': ['98'],
    'Iraq': ['964'],
    'Ireland': ['353'],
    'Israel': ['972'],
    'Italy': ['39'],
    'Jamaica': ['1876'],
    'Japan': ['81'],
    'Jordan': ['962'],
    'Kazakhstan': ['7'],
    'Kenya': ['254'],
    'Kiribati': ['686'],
    'Korea, North': ['850'],
    'Korea, South': ['82'],
    'Kuwait': ['965'],
    'Kyrgyzstan': ['996'],
    'Laos': ['856'],
    'Latvia': ['371'],
    'Lebanon': ['961'],
    'Lesotho': ['266'],
    'Liberia': ['231'],
    'Libya': ['218'],
    'Liechtenstein': ['423'],
    'Lithuania': ['370'],
    'Luxembourg': ['352'],
    'Macau (China)': ['853'],
    'Macedonia': ['389'],
    'Madagascar': ['261'],
    'Malawi': ['265'],
    'Malaysia': ['60'],
    'Maldives': ['960'],
    'Mali': ['223'],
    'Malta': ['356'],
    'Marshall Islands': ['692'],
    'Mauritania': ['222'],
    'Mauritius': ['230'],
    'Mexico': ['52'],
    'Federated States of Micronesia': ['691'],
    'Moldova': ['373'],
    'Monaco': ['377'],
    'Mongolia': ['976'],
    'Morocco': ['212'],
    'Mozambique': ['258'],
    'Namibia': ['264'],
    'Nauru': ['674'],
    'Nepal':['977'],
    'Netherlands':['31'],
    'Netherlands Antilles':['599'],
    'New Zealand':['64'],
    'Nicaragua':['505'],
    'Niger':['227'],
    'Nigeria':['234'],
    'Norway':['47'],
    'Oman':['968'],
    'Pakistan':['92'],
    'Palau':['680'],
    'Panama':['507'],
    'Papua New Guinea':['675'],
    'Paraguay':['595'],
    'Peru':['51'],
    'Philippines':['63'],
    'Poland':['48'],
    'Portugal':['351'],
    'Qatar':['974'],
    'Reunion':['262'],
    'Romania':['40'],
    'Russia':['7'],
    'Rwanda':['250'],
    'Saint Kitts and Nevis': ['1869'],
    'Saint Lucia': ['1758'],
    'Saint Vincent and the Grenadines': ['1784'],
    'Samoa': ['685'],
    'San Marino': ['378'],
    'Sao Tome and Principe': ['239'],
    'Saudi Arabia': ['966'],
    'Senegal': ['221'],
    'Serbia': ['381'],
    'Seychelles': ['248'],
    'Sierra Leone': ['232'],
    'Singapore': ['65'],
    'Slovakia': ['421'],
    'Slovenia': ['386'],
    'Solomon Islands': ['677'],
    'Somalia': ['252'],
    'South Africa': ['27'],
    'Spain': ['34'],
    'Sri Lanka': ['94'],
    'Sudan': ['249'],
    'Suriname': ['597'],
    'Svalbard': ['47'],
    'Swaziland': ['268'],
    'Sweden': ['46'],
    'Switzerland': ['41'],
    'Syria': ['963'],
    'Taiwan': ['886'],
    'Tajikistan': ['992'],
    'Tanzania': ['255'],
    'Thailand': ['66'],
    'Togo': ['228'],
    'Tonga': ['676'],
    'Trinidad and Tobago': ['1868'],
    'Tunisia': ['216'],
    'Turkey': ['90'],
    'Turkmenistan': ['993'],
    'Tuvalu': ['688'],
    'Uganda': ['256'],
    'Ukraine': ['380'],
    'United Arab Emirates': ['971'],
    'United Kingdom': ['44'],
    'United States': ['1'],
    'Uruguay': ['598'],
    'Uzbekistan': ['998'],
    'Vanuatu': ['678'],
    'Venezuela': ['58'],
    'Vietnam': ['84'],
    'West Bank': ['970'],
    'Western Sahara': ['212'],
    'Yemen': ['967'],
    'Zambia': ['260'],
    'Zimbabwe': ['263'],
  }
}
function get_masters_education_specialization($scope){
    $scope.masters_education_specialization = {
        'Chartered Accountant': [
            'Chartered Accountant',
        ],

        'CA Inter': [
            'Chartered Accountant'
        ],

        'Chartered Financial Analyst': [
            'Finance',
        ],

        'Company Secretary': [
            'Company Secretary',
        ],

        'Doctor of Medicine (MD)': [
            'Anatomy',
            'Anesthesiology',
            'Aviation Medicine',
            'Biochemistry',
            'Bio-Physics',
            'Blood Banking & Immuno. Haem',
            'Critical Care Medicine',
            'Community Health Administration',
            'Community Medicine',
            'Dermatology',
            'Forensic Medicine',
            'General Medicine',
            'Geriatrics',
            'Gynecology',
            'Health Administration',
            'Hospital Administration',
            'Lab Medicine',
            'Leprosy',
            'Maternity & Child Health',
            'Microbiology',
            'Nuclear Medicine',
            'Obstetrics',
            'Ophthalmology',
            'Pathology',
            'Pediatrics',
            'Pharmacology',
            'Physical Medicine & Rehabilitation',
            'Physiology',
            'Psychiatry',
            'Pulmonary Medicine',
            'R & D',
            'Radio Diagnosis',
            'Radio Therapy',
            'Radiology',
            'Social and Preventive Medicine',
            'Tropical Medicine',
            'Tuberculosis & Chest Diseases',
            'Veneriology',
            'Other',
        ],

        'Doctor of Surgery (MS)': [
            'Anaesthesia',
            'Anatomy',
            'Cardiology',
            'Dermatology',
            'ENT',
            'General Surgery',
            'Gyneocology',
            'Hepatology',
            'Immunology Microbiology',
            'Neonatal',
            'Nephrology/Urology',
            'Obstretrics',
            'Oncology',
            'Opthalmology',
            'Orthopedic',
            'Pathology',
            'Pediatrics',
            'Psychiatry/Psychology',
            'Radiology',
            'Rheumatology',
            'Other',
        ],

        'Inst. of Cost & Works Accountants': [
            'Cost & Works Accountant',
        ],

        'ICWA Inter': [
            'Cost & Works Accountant',
        ],

        'Master of Architecture': [
            'Architecture',
        ],

        'Master of Arts': [
            'Anthropology',
            'Arabic',
            'Arts & Humanities',
            'Communication',
            'Economics',
            'English',
            'Film',
            'Fine arts',
            'Hindi',
            'History',
            'Journalism',
            'Maths',
            'Middle Eastern Studies',
            'Political',
            'Science',
            'PR/ Advertising',
            'Psychology',
            'Religion',
            'Sociology',
            'Statistics',
            'Urdu',
            'Other',
        ],

        'Master of Commerce': [
            'Commerce',
        ],

        'Master of Education': [
            'Education',
        ],

        'Master of Laws (LLM)': [
            'Law',
        ],

        'Master of Pharmacy': [
            'Pharmacy',
        ],

        'Master of Science' : [

            'Agriculture',
            'Anthropology',
            'Bio-Chemistry',
            'Biology',
            'Botany',
            'Chemistry',
            'Computers',
            'Dairy',
            'Electronics',
            'Environmental Science',
            'Food Technology',
            'Geology',
            'Home Science',
            'Maths',
            'Microbiology',
            'Nursing',
            'Physics',
            'Statistics',
            'Technology',
            'Zoology',
            'Other',
        ],

        'Master of Technology/Engineering': [

            'Agriculture',
            'Automobile',
            'Aviation',
            'Bio-Chemistry',
            'Bio-Technology',
            'Biomedical',
            'Ceramics',
            'Chemical',
            'Civil',
            'Computers',
            'Electrical',
            'Electronics/Telecommunication',
            'Energy',
            'Environmental',
            'Instrumentation',
            'Marine',
            'Mechanical',
            'Metallurgy',
            'Mineral',
            'Mining',
            'Nuclear',
            'Paint/Oil',
            'Petroleum',
            'Plastics',
            'Production/Industrial',
            'Textile',
            'Other Engineering',
        ],

        'Master of Vetirenary Science': [
            'Veterinary Sciences',
        ],

        'Master of Computer Application': [
            'Computers',
        ],

        'MBA/PG Diploma in Business Mgmt ': [
            'Advertising/Mass Communication',
            'Finance',
            'HR/Industrial Relations',
            'Information Technology',
            'International Business',
            'Marketing',
            'Systems',
            'Other',
        ],
    }
}

function get_education_required($scope){
    $scope.education_required = [
        'Diploma',
        'Intermediate Schooling',
        'Secondary Schooling',
        'Degree - Any',
        'PG - Any',
        'Bachelor of Architecture',
        'Bachelor of Arts',
        'Bachelor of Business Administration',
        'Bachelor of Commerce'  ,
        'Bachelor of Dental Sugery' ,
        'Bachelor of Education' ,
        'Bachelor of Hotel Management'  ,
        'Bachelor of Laws (LLB)'    ,
        'Bachelor of Pharmacy'  ,
        'Bachelor of Science'   ,
        'Bachelor of Technology/Engineering'    ,
        'Bachelor of Vetirenary Science'    ,
        'Bachelor of Computer Application'  ,
        'MBBS',
        'Chartered Accountant',
        'CA Inter',
        'Chartered Financial Analyst',
        'Company Secretary',
        'Doctor of Medicine (MD)',
        'Doctor of Surgery (MS)',
        'Inst. of Cost & Works Accountants',
        'ICWA Inter',
        'Master of Architecture',
        'Master of Arts',
        'Master of Commerce',
        'Master of Education',
        'Master of Laws (LLM)',
        'Master of Pharmacy',
        'Master of Technology/Engineering',
        'Master of Vetirenary Science',
        'Master of Computer Application',
        'MBA/PG Diploma in Business Mgmt ',
        'Other',
    ]

}

function get_req_education_specialization($scope){
    $scope.req_education_specialization = {

          'Intermediate Schooling': [
            'General (College Proprietary)',
            'Other',
        ],

        'Secondary Schooling': [
            'Academic / General',
            'Commercial',
            'Technical',
            'Vocational',
            'Religion',
            'Other',
        ],

        'Diploma': [
            'Aircraft Maintenance',
            'Architecture',
            'Autoclave Operation',
            'Cement Technology',
            'Chemical',
            'Civil',
            'Computers</option>Construction Technology',
            'Drilling & Exploration Technology',
            'Electrical',
            'Electronics',
            'Engineering',
            'Export/Import',
            'Fashion Designing/Other Designing',
            'Foundry & Forging',
            'Graphic/ Web Designing',
            'Hotel Management',
            'Instrumentation & Control',
            'Insurance',
            'Jewelery Design & Manufacturing',
            'Machine Tool Maintenance & Repair',
            'Management',
            'Mechanical',
            'Medical Instrumentation',
            'Medical Lab Technology',
            'Petrochemical Technology',
            'Process Instrumentation',
            'Production Technology',
            'Refinery & Petro Chemical Technology',
            'Refrigeration & Airconditioning',
            'Surface Coating Technology',
            'Survey Engineering',
            'Telecommunication',
            'Tool & Die Technology',
            'Tourism',
            'Videography',
            'Visual Arts',
            'Vocational Course',
            'Welding Technology',
            'Other',
        ],

        'Bachelor of Architecture': [
            'Architecture',
        ],

        'Bachelor of Arts': [

            'Arabic',
            'Arts&Humanities',
            'Communication',
            'Economics',
            'English',
            'Film',
            'Fine arts',
            'Hindi',
            'History',
            'Journalism',
            'Middle Eastern Studies',
            'Political Science',
            'PR/Advertising',
            'Psychology',
            'Religion',
            'Sociology',
            'Statistics',
            'Urdu',
            'Vocational Course',
            'Other',
        ],

        'Bachelor of Business Administration': [
            'Management',
        ],

        'Bachelor of Commerce'  : [
            'Commerce',
        ],

        'Bachelor of Dental Sugery' : [

            'Dentistry',
        ],

        'Bachelor of Education' : [
            'Education',
            'Religious Education',
        ],

        'Bachelor of Hotel Management'  : [
            'Hotel Management',
        ],

        'Bachelor of Laws (LLB)'    : [
            'Law',
        ],

        'Bachelor of Pharmacy'  : [
            'Pharmacy',
        ],

        'Bachelor of Science'   : [
            'Agriculture',
            'Anthropology',
            'Bio-Chemistry',
            'Biology',
            'Botany',
            'Chemistry',
            'Computers',
            'Dairy',
            'Technology',
            'Electronics',
            'Environmental science',
            'Food Technology',
            'Geology',
            'Home Science',
            'Maths',
            'Microbiology',
            'Nursing',
            'Physics',
            'Statistics',
            'Zoology',
            'General',
            'Other',
        ],

        'Bachelor of Technology/Engineering' : [
            'Agriculture',
            'Automobile',
            'Aviation',
            'Bio-Chemistry',
            'Bio-Technology',
            'Biomedical',
            'Ceramics',
            'Chemical',
            'Civil',
            'Computers',
            'Electrical',
            'Electronics/Telecomunication',
            'Energy',
            'Environmental',
            'Instrumentation',
            'Marine',
            'Mechanical',
            'Metallurgy',
            'Mineral',
            'Mining',
            'Nuclear',
            'Paint/Oil',
            'Petroleum',
            'Plastics',
            'Production/Industrial',
            'Textile',
            'Other Engineering',
        ],

        'Bachelor of Vetirenary Science': [
            'Veterinary Sciences',
        ],

        'Bachelor of Computer Application'  : [
            'Computers',
        ],

        'MBBS': [

            'Medicine',
        ],

        'Chartered Accountant': [
            'Chartered Accountant',
        ],

        'CA Inter': [
            'Chartered Accountant'
        ],

        'Chartered Financial Analyst': [
            'Finance',
        ],

        'Company Secretary': [
            'Company Secretary',
        ],

        'Doctor of Medicine (MD)': [
            'Anatomy',
            'Anesthesiology',
            'Aviation Medicine',
            'Biochemistry',
            'Bio-Physics',
            'Blood Banking & Immuno. Haem',
            'Critical Care Medicine',
            'Community Health Administration',
            'Community Medicine',
            'Dermatology',
            'Forensic Medicine',
            'General Medicine',
            'Geriatrics',
            'Gynecology',
            'Health Administration',
            'Hospital Administration',
            'Lab Medicine',
            'Leprosy',
            'Maternity & Child Health',
            'Microbiology',
            'Nuclear Medicine',
            'Obstetrics',
            'Ophthalmology',
            'Pathology',
            'Pediatrics',
            'Pharmacology',
            'Physical Medicine & Rehabilitation',
            'Physiology',
            'Psychiatry',
            'Pulmonary Medicine',
            'R & D',
            'Radio Diagnosis',
            'Radio Therapy',
            'Radiology',
            'Social and Preventive Medicine',
            'Tropical Medicine',
            'Tuberculosis & Chest Diseases',
            'Veneriology',
            'Other',
        ],

        'Doctor of Surgery (MS)': [
            'Anaesthesia',
            'Anatomy',
            'Cardiology',
            'Dermatology',
            'ENT',
            'General Surgery',
            'Gyneocology',
            'Hepatology',
            'Immunology Microbiology',
            'Neonatal',
            'Nephrology/Urology',
            'Obstretrics',
            'Oncology',
            'Opthalmology',
            'Orthopedic',
            'Pathology',
            'Pediatrics',
            'Psychiatry/Psychology',
            'Radiology',
            'Rheumatology',
            'Other',
        ],

        'Inst. of Cost & Works Accountants': [
            'Cost & Works Accountant',
        ],

        'ICWA Inter': [
            'Cost & Works Accountant',
        ],

        'Master of Architecture': [
            'Architecture',
        ],

        'Master of Arts': [
            'Anthropology',
            'Arabic',
            'Arts & Humanities',
            'Communication',
            'Economics',
            'English',
            'Film',
            'Fine arts',
            'Hindi',
            'History',
            'Journalism',
            'Maths',
            'Middle Eastern Studies',
            'Political',
            'Science',
            'PR/ Advertising',
            'Psychology',
            'Religion',
            'Sociology',
            'Statistics',
            'Urdu',
            'Other',
        ],

        'Master of Commerce': [
            'Commerce',
        ],

        'Master of Education': [
            'Education',
        ],

        'Master of Laws (LLM)': [
            'Law',
        ],

        'Master of Pharmacy': [
            'Pharmacy',
        ],

        'Master of Science' : [

            'Agriculture',
            'Anthropology',
            'Bio-Chemistry',
            'Biology',
            'Botany',
            'Chemistry',
            'Computers',
            'Dairy',
            'Electronics',
            'Environmental Science',
            'Food Technology',
            'Geology',
            'Home Science',
            'Maths',
            'Microbiology',
            'Nursing',
            'Physics',
            'Statistics',
            'Technology',
            'Zoology',
            'Other',
        ],

        'Master of Technology/Engineering': [

            'Agriculture',
            'Automobile',
            'Aviation',
            'Bio-Chemistry',
            'Bio-Technology',
            'Biomedical',
            'Ceramics',
            'Chemical',
            'Civil',
            'Computers',
            'Electrical',
            'Electronics/Telecommunication',
            'Energy',
            'Environmental',
            'Instrumentation',
            'Marine',
            'Mechanical',
            'Metallurgy',
            'Mineral',
            'Mining',
            'Nuclear',
            'Paint/Oil',
            'Petroleum',
            'Plastics',
            'Production/Industrial',
            'Textile',
            'Other Engineering',
        ],

        'Master of Vetirenary Science': [
            'Veterinary Sciences',
        ],

        'Master of Computer Application': [
            'Computers',
        ],

        'MBA/PG Diploma in Business Mgmt': [
            'Advertising/Mass Communication',
            'Finance',
            'HR/Industrial Relations',
            'Information Technology',
            'International Business',
            'Marketing',
            'Systems',
            'Other',
        ],
    }
}

function get_req_roles($scope){
  $scope.req_roles = {
        'Admin/Secretarial': [
            'Fresher',
            'Travel/Immigration Coordinator',
            'Administration Executive',
            'Computer Operator/ Data Entry',
            'Typist',
            'Despatch Incharge',
            'Receptionist/ Front Desk',
            'Secretarial',
            'Executive Secretary/Personal Assistant',
            'Facilities Manager',
            'Administration Manager',
            'VP/ GM - Administration',
            'Other Admin/Clerical/Secretarial',
        ],
        'Customer Service/ Call Centre/ BPO': [
            'Fresher',
            'Trainee/ Management Trainee',
            'Technical Support Executive ( voice)',
            'Technical Support Representative (Non- voice)',
            'Customer Service Executive (Voice)',
            'Customer Service Executive (Non-voice)',
            'Data Processing Executive',
            'Telesales Executive',
            'Telemarketing Executive',
            'Manager - Data Processing',
            'Team Leader',
            'Medical Transcriptionist',
            'Transactions Processing Executive',
            'AR Caller/ AR Analyst',
            'Account Services Executive',
            'Operations Manager',
            'Manager - Service Delivery',
            'Technical Trainer',
            'Quality Assurance - Manager',
            'VP/ GM - Quality',
            'Shift Supervisor',
            'Training Manager',
            'Manager - Migrations/ Transitions',
            'Process/ Work Flow Analyst',
            'Quality Assurance Executive',
            'Voice & Accent Trainer',
            'Process Trainer',
            'Soft Skills Trainer',
            'VP/ Head - Customer Service',
            'VP - Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Customer Service/ Call Center',
        ],
        'Finance & Accounts': [
            'Fresher',
            'Graduate Trainee/ Management Trainee',
            'Book Keeper/ Accounts Assistant',
            'Accountant',
            'Accounts Manager',
            'Cost Accountant / ICWA',
            'Chartered Accountant (CPA)',
            'Accounts Head / GM - Accounts',
            'Finance Assistant',
            'Financial Controller',
            'Manager - Financial Planning / Budgeting',
            'Finance Manager',
            'Financial/ Business Analyst',
            'Head / GM - Finance',
            'Internal Auditor',
            'External Auditor',
            'Commercial Executive/Manager',
            'Credit Control & Collections',
            'Treasury Manager',
            'Company Secretary',
            'Taxation - Manager',
            'Shares Services Executive',
            'Business/ Strategic Planning - Manager',
            'Foreign Exchange Officer',
            'Payroll / Compensation Executive',
            'Payroll / Compensation - Manager / Head',
            'GM/Head/VP Corporate Planning/Strategy',
            'VP Finance/ CFO',
            'External Consultant',
            'Other Finance & Accounts',
        ],
        'Human Resources': [
            'Fresher',
            'Graduate Trainee / Management Trainee',
            'Payroll/ Compensation Executive',
            'HR Executive / Recruiter',
            'HR Manager',
            'HR Business Partner',
            'Training & Development Executive',
            'Payroll/ Compensation - Head/ Mgr',
            'Recruitment - Head/ Mgr',
            'Training & Development - Head/ Mgr',
            'Appraisals - Head/ Mgr',
            'Industrial Relations / Personnel Manager',
            'VP/ GM - HR',
            'External Consultant',
            'Other Human Resource',
        ],
        'IT': [
            'Fresher',
            'Trainee',
            'Software Engineer/ Programmer',
            'Systems Engineer',
            'Team Leader/ Technical Leader',
            'System Analyst/ Tech Architect',
            'Business Analyst',
            'Project Leader/ Project Manager',
            'Database Administrator (DBA)',
            'Database Architect/ Designer',
            'Delivery Manager',
            'Program Manager',
            'Datawarehousing Consultants',
            'System Administrator',
            'H/W Installation/ Maintenance Engg',
            'Network Administrator',
            'Network Designer',
            'Security Analyst',
            'System Security - Engineer',
            'Technical Support Engineer',
            'Software Test Engineer',
            'System Integrator',
            'Graphic Designer/ Animator',
            'ERP, CRM - Functional Consultant',
            'ERP, CRM - Technical Consultant',
            'ERP, CRM - Support Engineer',
            'S/W Installation/ Maintenance Engg',
            'Product Manager',
            'Configuration Mgr/ Release Manager',
            'Trainer/ Faculty',
            'Technical Writer',
            'VP/ GM - Quality',
            'Web Master/ Web Site Manager',
            'SEO Expert',
            'Hardware Design Engineer',
            'Hardware Design Technical Leader',
            'Quality Assurance Executive',
            'Quality Assurance - Manager',
            'Computer Operator/ Data Entry',
            'Instructional Designer',
            'EDP Analyst',
            'IT/ Networking (EDP) - Manager',
            'Information Systems (MIS) - Manager',
            'MIS Executive',
            'VP/ Head - Technology (IT)',
            'Chief Technology Officer',
            'Chief Information Officer',
            'VP - Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Software/Hardware/EDP',
        ],
        'Legal': [
            'Fresher',
            'Company Secretary',
            'Lawyer/ Attorney',
            'Legal Advisor',
            'Legal Assistant/ Apprentcie',
            'Legal Consultant/ Solicitor',
            'Law Officer',
            'Patent',
            'Private Practitioner / Lawyer',
            'Proof Reader (Law)',
            'Legal Editor',
            'Legal Services - Manager',
            'Legal Head',
            'Other Legal/ Law',
        ],
        'Marketing & Communications': [
            'Fresher',
            'Trainee/ Management Trainee',
            'Telesales/ Telemarketing Executive',
            'Corp Communications - Manager/ Executive',
            'Head - Corp Communications',
            'Advertising - Executive',
            'Advertising - Manager',
            'Public Relations - Executive',
            'Public Relations - Manager',
            'Events/ Promotions Manager',
            'Manager / Head - Internet Marketing',
            'Direct Marketing - Executive',
            'Direct Marketing - Manager',
            'Market Research - Executive',
            'Market Research - Manager',
            'Marketing Executive',
            'Marketing Manager',
            'Alliances Manager',
            'Business Analyst/ Consultant',
            'Brand Manager',
            'Product Executive',
            'Product Manager/ Product Head',
            'Marcom Executive',
            'Marcom - Manager / Head',
            'Executive - Internet Marketing',
            'Social Media Executive',
            'Head - Direct Marketing',
            'Head - Public Relations',
            'Head - Advertising',
            'VP/ GM/ Head - Marketing',
            'External Consultant',
            'Other Marketing',
        ],
        'Purchase/ Logistics/ Supply Chain': [ 
            'Fresher',
            'Graduate Trainee/ Management Trainee',
            'Computer Operator/ Data Entry',
            'Transit Centre (Rail) - Executive',
            'Distribution - Head',
            'Transportation/ Shipping Supervisor',
            'Logistics - Co-ordinator',
            'Logistics - Head/ Mgr',
            'Purchase Officer/ Co-ordinator/ Executive',
            'Purchase Manager',
            'Purchase - Head',
            'Vendor Development Manager',
            'Inventory Control Manager/ Materials Manager',
            'Country Network Coordinator',
            'POD Management',
            'Traffic Clerk',
            'Fleet Supervisor',
            'Supply Chain - Head',
            'External Consultant',
            'Store Keeper/ Warehouse Assistant',
            'Commercial - Manager',
            'Materials - Head/ GM',
            'VP/ GM - Commercial',
            'VP Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Purchase/ Supply Chain',
        ],
        'Sales/ Business Development': [
            'Fresher',
            'Sales Trainee/ Management Trainee',
            'Sales Exec/ Sales Representative',
            'Medical Representative',
            'Channel Sales Manager',
            'Relationship Mgr/ Account Servicing',
            'Key Accounts Manager',
            'Institutional sales',
            'Business Development Manager',
            'Business Development Executive',
            'Regional Sales Manager',
            'Area/ Territory Sales Manager',
            'Sales Promotion Manager',
            'International Business Dev Mgr',
            'Branch Manager',
            'Merchandiser',
            'Direct Sales Agent/ Commission Agent',
            'Telesales/ Telemarketing Executive',
            'Sales Trainer',
            'Presales Consultant',
            'Sales Engineer',
            'Sales Coordinator',
            'Team Leader',
            'National Sales Manager',
            'VP/ GM/ Head - Sales',
            'External Consultant',
            'Other Sales',
            'Corporate Sales',
        ],
        'Advertising/Entertainment/Media': [
            'Fresher',
            'Graduate Trainee/ Management Trainee',
            'Media Buying',
            'Media Planning',
            'Market Research',
            'Editor/ Managing Editor',
            'Account Servicing',
            'Correspondent/ Reporter',
            'Producer/ Production Manager',
            'Instructional Designer',
            'TV Anchor',
            'Art Director',
            'Translator',
            'AV Executive/ Editor',
            'Musician/Music Director',
            'Graphic Designer/ Animator',
            'Event Management',
            'Content Writer',
            'Technical Writer',
            'Copy Writer',
            'Photographer',
            'Cameraman',
            'Printing Technologist/ Manager',
            'Studio Operations Manager',
            'Account Planning',
            'Choreographer',
            'Head - Lighting',
            'Sound Mixer / Engineer',
            'VJ/RJ/DJ',
            'VP - Media Planning & Buying',
            'Creative Director',
            'VP Client Servicing',
            'Chief/ Deputy Chief of Bureau',
            'VP Operations/ COO',
            'SBU Head /Profit Centre Head',
            'Proof Reader',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Media/ Journalism',
        ],
        'Banking, Insurance & Financial Services': [
            'Fresher',
            'Graduate Trainee / Management Trainee',
            'Relationship manager',
            'Actuary',
            'Phone Banking Officer',
            'Consumer Banking Asset Operations',
            'Audit',
            'Bancassurance Executive/Manager',
            'M & A Advisor',
            'Cash Officer/ Manager',
            'Claims Management',
            'Clearing Officer/ Head',
            'Collections',
            'Compliance & Control',
            'Ratings Analyst',
            'Derivatives Analyst',
            'Investment Banking',
            'Trade Finance/ Cash Mgmt Services - Head/ Mgr',
            'Product Manager - Mutual Funds',
            'Product Manager - Cards',
            'Product Manager - Insurance',
            'Product Manager - Auto/Home/Personal Loan',
            'Credit Research Analyst',
            'Hedge Fund Analyst/Trader',
            'Commodity Dealer',
            'Equity Dealer',
            'Agency Manager',
            'Private Banker',
            'Depository Participant',
            'Project Finance - Head/ Mgr',
            'Consumer Branch Banking Operations',
            'Consumer Banking Branch Head',
            'Consumer Banking Region Head',
            'Corporate Banking Credit Analyst',
            'Credit Head - Consumer Banking',
            'Corporate Banking Credit Control Manager',
            'Corporate Banking Branch Head',
            'Corporate Banking Region Head',
            'Corporate Banking Customer Support Manager',
            'Corporate Banking Credit Head',
            'Cash Management Operations',
            'GM - Treasury',
            'Treasury Marketing Fixed Income',
            'GM - Risks',
            'Business Analyst',
            'VP Operations/ COO',
            'Advisory',
            'Chartered Accountant (CPA)',
            'Investment Advisor',
            'Portfolio Manager',
            'Securities Analyst/ Stock Broker',
            'Economist',
            'Trading Advisor',
            'Underwriting',
            'Consumer Banking Head',
            'Corporate Banking Head',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Banking',
        ],
        'Construction': [
            'Fresher',
            'Architect',
            'Civil Engineer',
            'Mechanical Engineer',
            'Design Engineer',
            'HVAC engineering',
            'Electrical Engineer',
            'Desalinational engineering',
            'Duct engineers',
            'Maintenance Engineer',
            'Contracting',
            'Detailer',
            'Civil Foreman',
            'Draftsman',
            'Quantity surveyor',
            'Process Reporting manager',
            'Project Manager',
            'Proposals & Estimation',
            'Surveyor',
            'Document Controller',
            'Marine engineering',
            'MEP - Buyers',
            'MEP - Surveyors',
            'Plumbing engineer',
            'Power & Telecom engineering',
            'Safety Officer',
            'Planning Engineer',
            'Site engineer',
            'Scaffolding Sales Professionals',
            'Structural Designing',
            'Water Treatment',
            'Construction Suptd/ Inspector',
            'Director - Constructions',
            'Director - Architecture',
            'Director - Projects',
            'VP/GM - Constructions',
            'VP/GM - Architecture',
            'VP/GM - Projects',
            'VP- Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Construction',
        ],
        'Education/ Teaching': [
            'Librarian',
            'Kindergarten/ Pre-primary Teacher',
            'Language Teacher',
            'Mathematics Teacher',
            'Science Teacher',
            'Social Sciences Teacher',
            'Music/ Dance Teacher',
            'IT Instructor',
            'Laboratory Assistant',
            'Computer Teacher',
            'Trainer',
            'School Coordinator',
            'Principal/ Head of School',
            'Lecturer/ Professor',
            'CEO/ MD',
            'Others',
        ],
        'Export/ Import': [
            'Trading',
            'Documentation/ Shipment Management',
            'Liaison',
            'International Business Dev Mgr',
            'Merchandiser',
            'VP - Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Export/ Import',
        ],
        'Health Care': [
            'Trainee / Intern',
            'Doctor',
            'Physician',
            'Dietician',
            'Consultant',
            'Pathologist',
            'Surgeon',
            'Orthopaedist',
            'Psychiatrist',
            'Specialist - Medicine',
            'Nephrologist',
            'Physiotherapist',
            'Psycologist',
            'Occupational Therapist',
            'Microbiologist',
            'Chemist',
            'Optometrist',
            'Radiologist',
            'Pharmacist',
            'Perfusionist',
            'Anaesthetist',
            'Ayurvedic Doctor',
            'Opthalmologist',
            'Nurse',
            'Hearing Aid Technician',
            'Lab Technician',
            'Bio-chemist',
            'Radiographer',
            'ECG/ CGA Technician',
            'Operation Theater Technician',
            'Medical Officer',
            'Front Office',
            'Patient Service Associate',
            'Medical Coder',
            'House Keeping',
            'Cardiologist',
            'Dentist',
            'Dermatologist',
            'ENT Specialist',
            'Gastronomist / Gastrologist',
            'Gyanecologist',
            'Medical Lab Supervisor',
            'Medical Superintendent/Dean/director',
            'Neurologist',
            'Hepatologist',
            'Oncologist',
            'Pediatrician',
            'Pulmonologist',
            'Speech Language Pathologist/Therapist',
            'VP - Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/MD/ Country Manager',
            'Director on Board',
            'Other Health Care/ Hospitals',
        ],
        'Hotels/ restaurants': [
            'Fresher',
            'Trainee/ Management Trainee',
            'Banquet Manager',
            'Bartender',
            'Butler',
            'Chief Chef',
            'F&B Manager',
            'Lobby/ Duty Manager',
            'Front Office Executive',
            'Front Office Manager',
            'Guest Relations Manager',
            'Banquet Sales',
            'Health Club Manager',
            'Hostess/ Host',
            'Guest Relations Executive',
            'House Keeping - Head/ Manager',
            'Maintenance Technician',
            'Reservation Manager',
            'Steward/ Waiter',
            'Restaurant Manager',
            'Club Floor Manager',
            'Business Center Manager',
            'House Keeping Executive',
            'Room Service Manager',
            'Security Manager/ Officer',
            'Laundry Manager',
            'Chef/ Kitchen Manager',
            'Sous Chef',
            'Training Manager',
            'Travel Agent/ Tour Operator',
            'Cashier',
            'Concierge',
            'Chief Engineer',
            'Shift Engineer/ Supervisor',
            'Masseur',
            'Attendant',
            'Quality Assurance/ Control',
            'VP/ GM - Quality',
            'VP Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'GM/ DGM',
            'External Consultant',
            'Other Hotels/ Restaurants',
        ],
        'Manufacturing/ Engineering/ R&D': [
            'Fresher',
            'Graduate Trainee / Management Trainee',
            'Chemical Engineer',
            'Civil Engineer',
            'Design Manager/ Engineer',
            'Electrical Engineer',
            'Electronics/ Instrumentation Engineer',
            'Spares Manager/ Engineer',
            'Environmental Engineer',
            'Industrial Engineering',
            'Mechanical Engineer',
            'Chief Engineer',
            'Maintenance',
            'Tool Room',
            'Paint Shop',
            'Press Shop',
            'Weld Shop',
            'Foreman',
            'Draughtsman',
            'Machine Operator',
            'Assembler',
            'Floor Supervisor',
            'Workshop Manager',
            'Process Manager/ Engineer',
            'Production Manager/ Engineer',
            'Projects',
            'Tech/ Engg - Manager',
            'Quality Assurance/ Control',
            'R & D Manager',
            'Safety Officer/ Engineer',
            'Service Manager/ Engineer',
            'Technician',
            'Marine Engineer',
            'Plant Head/ Factory Manager',
            'Mines Engineer',
            'Automotive Engineer',
            'Aviation Engineer',
            'Planning Engineer',
            'Sales Engineer',
            'Application Engineer',
            'Textile Designer',
            'Apparel Designer',
            'Accessory Designer',
            'Footwear Designer',
            'Jewelry Designer',
            'Product Manager',
            'Packaging',
            'Customer Service/ Tech Support',
            'Lab Staff',
            'Research Assistant',
            'Data Management/ Statistics',
            'Research Scientist',
            'Technical Writer',
            'Quality Assurance - Manager',
            'SBU Head/ Profit Centre Head',
            'VP/ GM - Engg/ Production',
            'VP/ GM - Quality',
            'VP/GM - R & D (Production & Engg)',
            'VP / GM - Design (Production & Engg)',
            'External Consultant',
            'CEO/ MD/ Country Manager',
            'VP Operations / COO',
            'Director on Board',
            'Other Production/ Engineering/ R&D',
        ],
        'Oil & Gas': [
            'Fresher',
            'Foreman',
            'Draughtsman',
            'Rigger',
            'Fire & gas technician',
            'HVAC expert',
            'Desalination expert',
            'Drilling expert',
            'Gas turbine expert',
            'Petrophysics / Geologist / Seismic Interpretation',
            'Thermal inspector',
            'Safety Engineer',
            'Structural Engineering',
            'Electrical and Instrumentation Engineering',
            'Rotating / Packaging / Static',
            'Engineering - Materials & Corrosion',
            'Engineering - Facilities/ Surface',
            'Engineering - Heating and Thermal Equipment',
            'Engineering - Offshore Structures',
            'Engineering - Pipelines',
            'Engineering - Pressure Equipment',
            'Engineering - Reactor &Solids Processing',
            'Engineering - Support',
            'Reservoir Engineering',
            'Well Engineering',
            'Exploration and Production Engineering',
            'Piping Engineering',
            'Mechanical Engineering',
            'SURF Engineers',
            'Field Engineer',
            'Inspection Engineer',
            'Chemical Engineer',
            'Tank Design Engineering',
            'Process Engineering',
            'Project Engineering',
            'Production & Manufacturing Downstream',
            'QA / QC',
            'FPSO / FSO Conversion Engineer',
            'Process Maintenance Engineer',
            'Risk Assessment Engineer',
            'Reliability Engineer',
            'Subsea - Project',
            'Research &Technology Development',
            'HSE Management Specialist',
            'HSEQ',
            'Gas Commercial Negotiator',
            'Gas Regulators/Planners',
            'Oil Trader / Bunker Trader',
            'Proposal & Estimation',
            'Commissioning',
            'Documentation Controller',
            'Packaging and Product Development',
            'Lab Technician',
            'Surveyor',
            'EPC (Engineering, Procurement and Construction',
            'Refinery Manager / Project Manager',
            'Plant Supervisor',
            'Head - Drilling & Completions',
            'Head - Development & Projects',
            'Head - EPC',
            'SBU Head /Profit Centre Head',
            'VP/GM - Projects',
            'VP-Operations / COO',
            'VP/GM - Manufacturing Plant',
            'VP/GM - Constructions',
            'CEO/MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Oil & Gas',
            'Subsea - Installation / System and Controls',
            'Subsea - Pipeline / Flow Assurance',
        ],       
      'Pharmaceutical/ Biotechnology': [
            'Fresher',
            'Practical Training/Internship',
            'Chemist',
            'Postdoc Position/Fellowship',
            'Lab Staff',
            'Microbiologist',
            'Product Manager',
            'Nutritionist',
            'Pharmacist',
            'Quality Assurance - Manager',
            'Basic Research Scientist',
            'VP Operations/ COO',
            'VP/ GM - Quality',
            'VP/ GM R&D (Pharma)',
            'Bio-Technology Research Scientist',
            'Clinical Research Scientist',
            'Chemical Research Scientist',
            'Drug Regulatory Doctor',
            'Regulatory Executive',
            'Pharmaceutical Research Scientist',
            'Analytical Chemistry Scientist',
            'Goods Manufacturing Practices (GMP)',
            'Data Management/ Statistics',
            'Documentation/ Medical Writing',
            'Technology Transfer Engineer',
            'Quality Assurance/ Control',
            'Production Manager',
            'Medical Affairs Manager',
            'Molecular Biologist',
            'Nuclear Medicine',
            'Toxicologist',
            'Formulation Scientist',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Pharma',
        ],
      'Analytics/Business Intelligence': [
            'Fresher',
            'Data Analyst',
            'Web Analyst',
            'Financial Analyst',
            'Business analyst',
            'Marketing Analyst',
            'Insurance Analyst',
            'Chief Information Officer',
            'VP Operations / COO',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Analytics/Business Intelligence',
        ],
      'Real Estate': [
            'Fresher',
            'Management Trainee',
            'Architect',
            'Interior Designer',
            'Brokerage',
            'Land Development',
            'Property Management',
            'Real Estate Appraising',
            'Real Estate Counseling',
            'Real Estate Research',
            'VP Operations/ COO',
            'SBU Head/ Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Other Real Estate',
        ],
        'Retail Chains': [
            'Fresher',
            'Trainee/ Management Trainee',
            'Area Manager',
            'Regional Manager',
            'Shift Manager',
            'Buyer / Sourcing Manager',
            'Front Desk',
            'Quality Assurance/ Control',
            'Retail Store Manager',
            'Operations Executive/Supervisor',
            'Merchandiser',
            'Inventory Control Manager',
            'Cashier',
            'Loyalty Program',
            'Sales Exec/ Sales Representative',
            'Visual Merchandiser',
            'Loss Prevention Manager',
            'Technical - Manager',
            'VP/ GM - Quality',
            'GM',
            'SBU Head /Profit Centre Head',
            'VP Operations/ COO',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Retail Chains/Shops',
        ],
        'Telecom/ ISP': [
            'Fresher',
            'Graduate Trainee / Management Trainee',
            'RF Planning Engineer',
            'Network Installation & Administration',
            'Network Administrator',
            'Network Planning - Chief Engineer',
            'GSM Engineer',
            'Telecom Engineer',
            'RF Installation & Administration Engineer',
            'RF Planning - Chief Engineer',
            'O&M Engineer',
            'Switching - Engineer',
            'Switching - Chief Engineer',
            'System Administrator',
            'System Engineer',
            'System Security - Engineer',
            'System Security - Chief Engineer',
            'Network Planning - Engineer',
            'Customer Support Engineer/ Technician',
            'Outside Service Providers',
            'Regional Mgr/ Manager(Operations)',
            'Quality Assurance Executive',
            'Quality Assurance - Manager',
            'Project Manager',
            'VP/ GM - Quality',
            'VP/ Head - Technology (Telecom/ ISP)',
            'VP Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/ MD/ Country Manager',
            'Director on Board',
            'External Consultant',
            'Other Telecom/ISP',
        ],
        'Travel/ Airlines': [
            'Fresher',
            'Trainee/ Management Trainee',
            'Reservation and Ticketing',
            'Domestic Travel',
            'International Travel',
            'Documentaion & VISA',
            'Travel Agent/ Tour Operator',
            'Air Hostess/ Steward/ Cabin Crew',
            'Pilot',
            'Ground Staff',
            'Maintenance Engineer',
            'Cashier',
            'Office Assistant',
            'Branch Head',
            'VP - Operations/ COO',
            'SBU Head /Profit Centre Head',
            'CEO/MD/ Country Manager',
            'Director on Board',
            'GM',
            'External Consultant',
            'Other Travel/ Airlines',
        ],
        'Others': [
            'Entrepreneur',
            'Fashion Designer',
            'Fitness Trainer',
            'Horticulturist',
            'Model',
            'Painter',
            'Security Officer',
            'Statistician',
            'Consultant',
            'Electrician',
            'Driver/Chauffeur',
            'Beautician',
            'Language Expert',
            'AC Technician',
            'Jewellery Designer',
            'Other Roles',
        ],
    }
}

function get_nationalities($scope){
    $scope.nationalities = [

        'Afganistani',
        'Albanian',
        'Algerian',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctican',
        'Antigua and Barbuda',
        'Argentina',
        'Armenian',
        'Aruba',
        'Australian',
        'Austrian',
        'Azerbaijan',
        'Bahamas',
        'Bahraini',
        'Bangladeshi',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutani',
        'Bolivian',
        'Bosnia and Herzegovinan',
        'Botswana',
        'Bouvet Island',
        'Brazilian',
        'British Indian Ocean Territory',
        'Brunei Darussalam',
        'Bulgarian',
        'Burkina Faso',
        'Burundi',
        'Cambodian',
        'Cameroon',
        'Canadian',
        'Cape Verde',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'Chinese',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombian',
        'Comoros',
        'Congo',
        'Cook Islands',
        'Costa Rica',
        "Cote D'Ivoire",
        'Croatia',
        'Cuban',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egyptian',
        'El Salvador',
        'Emirati',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopian',
        'Falkland Islands (Malvinas)',
        'Faroe Islands',
        'Fiji',
        'Filipino',
        'Finland',
        'French',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories',
        'Gabon',
        'Georgian',
        'German',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guinean',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard Island and Mcdonald Islands',
        'Holy See (Vatican City State)',
        'Honduras',
        'Hong Kong',
        'Hungarian',
        'Iceland',
        'Indian',
        'Indonesian',
        'Iranian',
        'Ireland',
        'Israeli',
        'Japanese',
        'Jordanian',
        'Kazakhstani',
        'Kenyan',
        'Kiribati',
        "Korea, Democratic People's Republic of",
        'Korea, Republic of',
        'Kuwaiti',
        'Kyrgyzstani',
        "Lao People's Democratic Republic",
        'Latvian',
        'Lebanese',
        'Lesotho',
        'Liberian',
        'Libyan Arab Jamahiriya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macao',
        'Macedonia, the Former Yugoslav Republic of',
        'Madagascar',
        'Malawi',
        'Malaysian',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Martinique',
        'Mauritanian',
        'Mauritius',
        'Mayotte',
        'Mexican',
        'Micronesia, Federated States of',
        'Moldova, Republic of',
        'Monaco',
        'Mongolian',
        'Montserrat',
        'Moroccan',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepalese',
        'Netherlands',
        'Netherlands Antilles',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigerian',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islan',
        'Norway',
        'Omani',
        'Pakistani',
        'Palau',
        'Palestinian',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Pitcairn',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatari',
        'Reunion',
        'Romanian',
        'Russian',
        'Rwanda',
        'Saint Helena',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Pierre and Miquelon',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi',
        'Senegal',
        'Serbia and Montenegro',
        'Seychelles',
        'Sierra Leone',
        'Singaporean',
        'Slovakian',
        'Slovenian',
        'Solomon - Islands   ',
        'Somalian',
        'South African',
        'South Georgia and the South Sandwich Islands',
        'Spanish',
        'Sri Lankan',
        'Sudanese',
        'Suriname',
        'Svalbard and Jan Mayen',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syrian',
        'Taiwanese',
        'Tajikistan',
        'Tanzania, United Republic of',
        'Thai',
        'Timor-Leste',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkish',
        'Turkmenistan',
        'Turks and Caicos Islands',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Kingdom',
        'United States',
        'United States Minor Outlying Islands',
        'Uruguay',
        'Uzbekistani',
        'Vanuatu',
        'Venezuela',
        'Vietnamese',
        'Virgin Islands, British',
        'Virgin Islands, U.s.',
        'Wallis and Futuna',
        'Western Sahara',
        'Yemeni',
        'Zambian',
        'Zimbabwe',
        'Other',
        
    ]
}

function get_industries($scope){
    $scope.industries = [
        'Automotive/ Ancillaries',
        'Banking/ Financial Services',
        'Bio Technology and Life Sciences',
        'Chemicals/Petrochemicals',
        'Construction',
        'FMCG',
        'Education',
        'Entertainment/ Media/ Publishing',
        'Insurance',
        'ITES/BPO',
        'IT/ Computers - Hardware',
        'IT/ Computers - Software',
        'KPO/Analytics',
        'Machinery/ Equipment Mfg.',
        'Oil/ Gas/ Petroleum',
        'Pharmaceuticals',
        'Plastic/ Rubber',
        'Power/Energy',
        'Real Estate',
        'Retailing',
        'Telecom',
        'Advertising/PR/Events',
        'Agriculture/ Dairy Based',
        'Aviation/Aerospace',
        'Beauty/Fitness/PersonalCare/SPA',
        'Beverages/ Liquor',
        'Cement',
        'Ceramics and Sanitary Ware',
        'Consultancy',
        'Courier/ Freight/ Transportation',
        'Dotcom',
        'Electrical/Switchgear',
        'Engineering, Procurement, Construction',
        'Environmental Service',
        'Facility management',
        'Fertilizer/ Pesticides',
        'Food and Packaged Food',
        'Textiles / Yarn / Fabrics / Garments',
        'Gems/ Jewellery',
        'Government/ PSU/ Defence',
        'Consumer Electronics/Appliances',
        'Hospitals/ Health Care',
        'Hotels/ Restaurant',
        'Import / Export',
        'Iron/ Steel',
        'ISP',
        'Law Enforcement/Security Services',
        'Leather',
        'Market Research',
        'Medical Transcription',
        'Mining',
        'NGO',
        'Non-Ferrous Metals',
        'Office Equipment/Automation',
        'Paints',
        'Paper',
        'Printing/ Packaging',
        'Public Relations (PR)',
        'Shipping/ Marine Services',
        'Tyres',
        'Wood',
        'Travel/ Tourism',
        'Other',
    ]
}

function get_functions($scope){
    $scope.functions = [
        'Admin/Secretarial',
        'Customer Service/ Call Centre/ BPO',
        'Finance & Accounts' , 
        'Human Resources' , 
        'IT' ,
        'Legal' ,
        'Marketing & Communications' ,
        'Purchase/ Logistics/ Supply Chain' ,
        'Sales/ Business Development' , 
        'Advertising/Entertainment/Media' ,
        'Banking, Insurance & Financial Services',
        'Construction',
        'Education/ Teaching',
        'Export/ Import',
        'Health Care',
        'Hotels/ restaurants',
        'Manufacturing/ Engineering/ R&D',
        'Oil & Gas',
        'Pharmaceutical/ Biotechnology',
        'Analytics/Business Intelligence',
        'Real Estate',
        'Retail Chains',
        'Telecom/ ISP',
        'Travel/ Airlines',
        'Others',
    ]
}

function get_currencies($scope){
    $scope.currencies = ['US Dollars',
        'UK Pound',
        'Indian Rupees', 
        'UAE Dirham',
        'Dinar',        
        'Riyal',
        'Australian Dollars',
        'Singapore Dollars',
        'Sri Lankan Rupee',
        'Euro',        
        'Yen',       
    ]
}
function get_job_seeker_details($scope, $http) {
    show_loader()
    $http.get('/jobseeker/edit_details/'+$scope.jobseeker_id+'/').success(function(data)
    { 

        $scope.user_login_details = data.user_login_details[0];
        $scope.personal = data.personal[0]; 
        $scope.current_employer = data.current_employer[0]; 
        $scope.educational_details = data.educational_details[0];
        
        $scope.resume_details = data.resume_details[0];
        $scope.photo_details = data.photo_details[0];
        get_stream($scope);
        get_master_stream($scope);
        if ($scope.educational_details.pass_year_masters == null) {
            $scope.educational_details.pass_year_masters = '';
        }
        if ($scope.current_employer.years == null) {
            $scope.current_employer.years = '';
        }
        if ($scope.educational_details.doctorate) {
            if($scope.educational_details.doctorate.length > 1 && $scope.educational_details.doctorate.length <= 3){
                for(var i=1; i < $scope.educational_details.doctorate.length; i++){
                    $scope.doctorate.push({'name': ''});
                }
            }
            for(var i=0; i< $scope.educational_details.doctorate.length; i++) {
                $scope.doctorate[i].name = $scope.educational_details.doctorate[i].doctorate;
            }
            if ($scope.educational_details.doctorate.length == 3){
                $scope.hide_doc = false;
            }
        }
        if ($scope.current_employer.employers) {
            if($scope.current_employer.employers.length > 1 && $scope.current_employer.employers.length <= 3){
                for(var i=1; i < $scope.current_employer.employers.length; i++){
                    $scope.employers.push({'employer': ''});
                }
            }
            for(var i=0; i< $scope.current_employer.employers.length; i++) {
                $scope.employers[i].employer = $scope.current_employer.employers[i].employer;
            }
            if ($scope.current_employer.employers.length == 3) {
                $scope.hide_emp = false;
            }
        } 
        if ($scope.current_employer.locations.length > 0) {
            for (var j=0; j<$scope.countries.length; j++) {
                for (var i=0;i<$scope.current_employer.locations.length; i++) {
                    if ($scope.current_employer.locations[i].location == $scope.countries[j]) {
                        $scope.countries[j].selected = true;
                    }
                }
            }
        }      
        if ($scope.current_employer.companies.length > 0) {
            for (var j=0; j<$scope.companies.length; j++) {
                for (var i=0;i<$scope.current_employer.companies.length; i++) {
                    if ($scope.current_employer.companies[i].id == $scope.companies[j].id) {
                        $scope.companies[j].selected = true;
                    }
                }
            }
        }
        hide_loader();
    }).error(function(data, status)
    {
        console.log(data || "Request failed");
    });
}
function get_companies($scope, $http) {
    show_loader();
    $http.get('/jobseeker/get_companies/').success(function(data){
        $scope.companies = data.companies;
        hide_loader();
     }).error(function(data){
        console.log(data || "Request failed");
    });    
}
function get_jobs($scope, $http) {
    show_loader();
    $http.get('/employer/get_jobs/').success(function(data){
        $scope.jobs = data.jobs_list;  
        hide_loader();
    }).error(function(data){
        console.log(data || "Request failed");
    });    
}
function get_employer_details($scope, $http) {
    show_loader();
    $http.get('/employer/edit_recruiter_profile/'+$scope.employer_id+'/').success(function(data)
    {
        $scope.recruiter = data.recruiter[0]; 
        hide_loader();       
    }).error(function(data, status)
    {
        console.log(data || "Request failed");
    });

}
function get_stream($scope) { 
    var basic_edu = $scope.educational_details.basic_edu; 
    if (basic_edu == '' || basic_edu == undefined) {
        $scope.basic_specializations = [];
    }
    $scope.basic_specializations = $scope.basic_education_specialization[basic_edu];
}
function get_master_stream($scope) {
    var masters_edu = $scope.educational_details.masters_edu;
    $scope.specializations = $scope.masters_education_specialization[masters_edu];
} 
function job_seeker_initialization_details($scope) {
    $scope.year = [];
    $scope.months =[];
    $scope.experience =[];
    $scope.salary = '';
    $scope.currency = '';
    $scope.resume_text = '';

    $scope.hide_doc = true;
    $scope.hide_emp = true;

    $scope.is_valid = false;
    $scope.error_flag = false;
    $scope.error_message = '';

    $scope.photo_img = {};
    $scope.photo_img.src = "";

    $scope.resume_doc = {};
    $scope.resume_doc.src = "";

    $scope.checkbox = false;
    $scope.job_seeker_id = 0;
    $scope.user_login_details = {
        'id': $scope.job_seeker_id,
        'password': '',
        'password1': '',
        'first_name': '',
        'last_name': '',
    }
    $scope.personal = {
        'id': $scope.job_seeker_id,   
       
        'gender': '',
        'dob':'',
        'marital_status': '',
        'nationality': '',
        'country': '',
        'city': '',
        'mobile': '',
        'phone': '',
        'alt_email': '',
    }
    $scope.current_employer = {
        'id': $scope.job_seeker_id,
        'years': 0,
        'months': 0,
        'salary': 0,
        'currency': '',
        'designation': '',
        'industry': '',
        'functions': '',
        'employers': [],
        'skills': '',
        'locations': [],
    }
    $scope.educational_details = {
        'id': $scope.job_seeker_id,
        'basic_edu': '',
        'basic_specialization': '',
        'pass_year_basic': '',
        'masters_edu': '',
        'master_specialization': '',
        'pass_year_masters': '',
        'doctrate': [],
    }
    $scope.resume_details = {
        'id': $scope.job_seeker_id,
        'resume_title': '',
        'resume_text': '',
        'resume': '',
        'remove_resume': 'false',
    }
    $scope.photo_details = {
        'id': $scope.job_seeker_id,
        'profile_photo': '',
    }
    $scope.employers = [
        {'employer': ''},
    ]

    $scope.doctorate = [
        {'name': ''},
    ]
    get_currencies($scope);
    get_countries($scope);
    get_nationalities($scope);
    get_industries($scope);
    get_functions($scope);
    get_basic_education($scope);
    get_basic_education_specialization($scope);
    get_masters_education($scope);
    get_masters_education_specialization($scope);
    new Picker.Date($$('#dob'), {
        timePicker: false,
        positionOffset: {x: 5, y: 0},
        pickerClass: 'datepicker_bootstrap',
        useFadeInOut: !Browser.ie,
        format:'%d/%m/%Y',
    });
    for(var i=1970; i<=2014; i++){
        $scope.year.push(i);
    }
    for(var i=0; i<=50; i++){
        $scope.experience.push(i);
    }
}
function hide_jobseeker_details_block($scope) {
    $scope.view_user_login_details = false;
    $scope.view_personal_details = false;
    $scope.view_educational_details = false;
    $scope.view_employment_details = false;
    $scope.view_resume_details = false;
    $scope.view_photo_details  =false;
}
function current_employer_validation($scope) {
    if (Number($scope.current_employer.years) === '' && Number($scope.current_employer.months) === ''){
        $scope.current_employer_validation_msg = 'Please enter total experience';
        return false;
    } else if (($scope.current_employer.salary != null || $scope.current_employer.salary != '' || $scope.current_employer.salary != undefined) && $scope.current_employer.salary != Number($scope.current_employer.salary)){
        $scope.current_employer_validation_msg = 'Please enter a Valid Amount for Salary';
        return false;
    } else if ($scope.current_employer.salary != '' && ($scope.current_employer.currency == '' || $scope.current_employer.currency == undefined)) {
        $scope.current_employer_validation_msg = 'Please provide the Currency';
        return false;
    } else if ($scope.current_employer.industry == '' || $scope.current_employer.industry == undefined){
        $scope.current_employer_validation_msg = 'Please select Industry Type';
        return false;
    } else if ($scope.current_employer.functions == '' || $scope.current_employer.functions == undefined){
        $scope.current_employer_validation_msg = 'Please select Functional Area';
        return false;
    } else if ($scope.current_employer.skills == '' || $scope.current_employer.skills == undefined){
        $scope.current_employer_validation_msg = 'Please enter Key Skills';
        return false;
    } else if ($scope.current_employer.locations.length > 5){
        $scope.current_employer_validation_msg = 'Please choose a maximum of 5 Locations';
        return false;
    } else if ($scope.current_employer.companies != undefined && $scope.current_employer.companies.length > 5){
        $scope.current_employer_validation_msg = 'Please choose a maximum of 5 Companies';
        return false;
    } return true;
}
function add_employer($scope){
    if($scope.employers.length <3) {
        $scope.employers.push({'employer':''});
    }
    if($scope.employers.length == 3){
      $scope.hide_emp = false;
    }
}
function delete_employer(index, $scope){
    
    $scope.employers.splice(index, 1);
    
}
function add_doctorate($scope){
    if($scope.doctorate.length <3) {
        $scope.doctorate.push({'name':''});
    }
    if($scope.doctorate.length == 3){
      $scope.hide_doc = false;
    }
}
function delete_doctorate(index, $scope){
    
    $scope.doctorate.splice(index, 1);
 
}
function save_resume_details($scope, $http, type) {
    show_loader();
    if($scope.resume_details.is_resume_show == true)
        $scope.resume_details.is_resume_show = "true";
    else
        $scope.resume_details.is_resume_show = "false";
    if($scope.resume_details.resume_text == null)
        $scope.resume_details.resume_text = '';
    params = {
        'resume_details': angular.toJson($scope.resume_details),
        'csrfmiddlewaretoken': $scope.csrf_token,
    }
    var fd = new FormData();
    fd.append('resume_doc', $scope.resume_doc.src);
    for(var key in params){
        fd.append(key, params[key]);          
    }
    var url = "/jobseeker/save_resume_details/";
    $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined
        }
    }).success(function(data, status) {
        if (data.result == 'ok') {
            if (type == 'save') {
                $scope.job_seeker_id = data.job_seeker_id;
                $scope.personal_details = false;
                $scope.educational_detail = false;
                $scope.resume_detail = false;
                $scope.photo_detail = true;
            } else {
                $scope.job_seeker_id = data.job_seeker_id;
                document.location.href = '/jobseeker/jobseeker_details/';
            }
        } else {
            $scope.resume_validation_message = data.message;
        }
        hide_loader();
    });
}
function save_photo_details($scope, $http) {
    show_loader();
    params = {
        'photo_details': angular.toJson($scope.photo_details),
        'csrfmiddlewaretoken': $scope.csrf_token,
    }
    var fd = new FormData();
    fd.append('photo_img', $scope.photo_img.src);
    for(var key in params){
        fd.append(key, params[key]);          
    }
    var url = "/jobseeker/save_photo_details/";
    $http.post(url, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined
        }
    }).success(function(data, status) {
        if (data.result == 'ok') {
            $scope.job_seeker_id = data.job_seeker_id;
            document.location.href = '/jobseeker/jobseeker_details/';
        } else {
            // $scope.photo_validation_message = data.message;
        }
        hide_loader();
    });
}
function save_educational_details($scope, $http, type) {
    show_loader();
    if (type == 'edit') {
        $scope.educational_details.id = $scope.jobseeker_id;
      } 
    $scope.educational_details.doctrate = $scope.doctorate.name;
    $scope.educational_details.doctrate = JSON.stringify($scope.doctorate);
    params = {
        'educational_details': angular.toJson($scope.educational_details),
        'csrfmiddlewaretoken': $scope.csrf_token,
    }
    $http({
        method : 'post',
        url : "/jobseeker/save_educational_details/",
        data : $.param(params),
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).success(function(data, status) {
        if (data.result == 'ok') {
            if (type == 'save') {
                $scope.job_seeker_id = data.job_seeker_id;
                $scope.personal_details = false;
                $scope.educational_detail = false;
                $scope.resume_detail = true;
            } else {
                $scope.job_seeker_id = data.job_seeker_id;
                document.location.href = '/jobseeker/jobseeker_details/';
            }
        } else {
            $scope.educational_validation_msg = data.message;
        }
        hide_loader();
    });
}
function save_current_employer_details($scope, $http, type) {

    if (type == 'edit') {
        $scope.current_employer.id = $scope.jobseeker_id;
      } 
    if (current_employer_validation($scope)) {
        show_loader();
        $scope.current_employer.selected_companies = [];
        console.log($scope.current_employer.companies);
        if($scope.current_employer.companies != undefined && $scope.current_employer.companies.length > 0 && !angular.isUndefined($scope.current_employer.companies[0].id)){
            for(var i = 0; i < $scope.current_employer.companies.length; i++){
              $scope.current_employer.selected_companies.push($scope.current_employer.companies[i].id);
            }
        }
        else
           $scope.current_employer.selected_companies = $scope.current_employer.companies;
        $scope.current_employer.employers = $scope.employers.employer;
        $scope.current_employer.employers = JSON.stringify($scope.employers);
        params = {
            'current_employer_details': angular.toJson($scope.current_employer),
            'csrfmiddlewaretoken': $scope.csrf_token,
        } 
     
        $http({
            method : 'post',
            url : "/jobseeker/save_current_employer_details/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            if (data.result == 'ok') {
                if (type == 'save') {

                    $scope.job_seeker_id = data.job_seeker_id;
                    $scope.personal_details = false;
                    $scope.current_employment_details = false;
                    $scope.educational_detail = true;
                    
                } else {
                    $scope.job_seeker_id = data.job_seeker_id;
                    document.location.href = '/jobseeker/jobseeker_details/';
                }
            } else {
                $scope.current_employer_validation_msg = data.message;
            }
            hide_loader();
        });
    }
}
function save_personal_details($scope, $http, type) {
    show_loader();
    if (type == 'edit') {
        $scope.personal.id = $scope.jobseeker_id;
    }
    params = {
        'personal_details': angular.toJson($scope.personal),
        'csrfmiddlewaretoken': $scope.csrf_token,
    }
    $http({
        method : 'post',
        url : "/jobseeker/save_personal_details/",
        data : $.param(params),
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).success(function(data, status) {
        if (data.result == 'ok') {
            if (type == 'save') {
                $scope.job_seeker_id = data.job_seeker_id;
                $scope.current_employer.id = $scope.job_seeker_id;
                $scope.educational_details.id = $scope.job_seeker_id;
                $scope.resume_details.id = $scope.job_seeker_id;
                $scope.photo_details.id = $scope.job_seeker_id;
                $scope.personal_details = false;
                $scope.current_employment_details = true;
            } else {
                document.location.href = '/jobseeker/jobseeker_details/';
            }
        } else {
            $scope.personal_validation = data.message;
        }
        hide_loader();
    });
}
function save_user_login_details($scope, $http, type) {
    show_loader();
    if (type == 'edit') {
        $scope.user_login_details.id = $scope.jobseeker_id;
    }
    params = {
        'user_login_details': angular.toJson($scope.user_login_details),
        'csrfmiddlewaretoken': $scope.csrf_token,
    }
    $http({
        method : 'post',
        url : "/jobseeker/save_user_login_details/",
        data : $.param(params),
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }).success(function(data, status) {
        if (data.result == 'ok') {
            if (type == 'save') {
                $scope.job_seeker_id = data.job_seeker_id;
                
                $scope.personal.id = $scope.job_seeker_id;
                $scope.current_employer.id = $scope.job_seeker_id;
                $scope.educational_details.id = $scope.job_seeker_id;
                $scope.resume_details.id = $scope.job_seeker_id;
                $scope.photo_details.id = $scope.job_seeker_id;
                $scope.user_login_detail = false;
                $scope.personal_details = true;
                
            } else {
                document.location.href = '/jobseeker/jobseeker_details/';
            }
        } else {
            $scope.user_login_validation = data.message;
        }
        hide_loader();
    });
}
/* End common js methods */

function HomeController($scope, $element, $http, $timeout, share, $location)
{
    $scope.is_keyword = false;
    $scope.location = 'select';
    $scope.industry = 'select';
    $scope.login_details = {
      'username': '',
      'password': '',
    }    
    $scope.init = function(csrf_token, is_login_popup) {
        $scope.csrf_token = csrf_token;        
        $scope.skills = '';
        $scope.job_location = '';
        $scope.industry = '';
        $scope.contact = {
          'name': '',
          'message': '',
          'mail': '',
          'source': '',
          'mobile': '',
        }
        $scope.source = {
          'other': '',
        }
        $scope.resume = {
          'name': '',
          'mobile': '',
          'mail': '',
        }
        get_industries($scope);
        get_countries($scope);
        if(is_login_popup == 'True'){
          $scope.show_login_popup();
        }
    }
    $scope.job_search  = function() {      
        $scope.is_keyword = false;
        $scope.is_location = false;
        $scope.is_exp = false;
        $scope.is_function = false;
        var url = '/jobseeker/job_search/?location='+$scope.job_location+'&skills='+$scope.skills+'&industry='+$scope.industry;
        document.location.href = url;
    }
    $scope.contact_us = function(){
      if($scope.contact.name == '' || $scope.contact.name == undefined){
        $scope.validation_message = 'Please enter your Name';
        return false;
      } else if($scope.contact.mobile == '' || $scope.contact.mobile == undefined){
        $scope.validation_message = 'Please enter your Contact Number';
        return false;
      } else if($scope.contact.mobile != '' && (!Number($scope.contact.mobile) || $scope.contact.mobile.length > 15 || $scope.contact.mobile.length < 7)) {
        $scope.validation_message = 'Please provide a Valid Contact Number';
        return false;        
      } else if($scope.contact.mail == '' || $scope.contact.mail == undefined){
        $scope.validation_message = 'Please enter your Email Address';
        return false;
      } else if($scope.contact.mail && !(validateEmail($scope.contact.mail))){
        $scope.validation_message = 'Please enter a valid Email Address';
        return false;
      } else if($scope.contact.source == 'Others' && $scope.source.other == ''){
        $scope.validation_message = 'Please specify the source';
        return false;
      } else{
        show_loader();
          params = {
            'sender_details': angular.toJson($scope.contact),
            'other_source': $scope.source.other,
            'csrfmiddlewaretoken': $scope.csrf_token,
          }
          $http({
            method : 'post',
            url : "/contact/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
          }).success(function(data, status) {
            hide_loader();
            $scope.contact.mobile = "";
            $scope.contact.mail = "";
            $scope.contact.name = "";
            $scope.contact.message = "";
            $scope.contact.source = "";
            $scope.validation_message = data.message;
         }); 
      }
    }
    $scope.request_resume = function(){
      if($scope.resume.name == '' || $scope.resume.name == undefined){
        $scope.validation_message = 'Please enter your Name';
        return false;
      } else if($scope.resume.mail == '' || $scope.resume.mail == undefined){
        $scope.validation_message = 'Please enter your Email Address';
        return false;
      } else if($scope.resume.mail && !(validateEmail($scope.resume.mail))){
        $scope.validation_message = 'Please enter a valid Email Address';
        return false;
      } else if($scope.resume.mobile == '' || $scope.resume.mobile == undefined){
        $scope.validation_message = 'Please enter your Mobile Number';
        return false;
      } else if (!Number($scope.resume.mobile) || $scope.resume.mobile.length > 15 || $scope.resume.mobile.length < 7) {
        $scope.validation_message = 'Please enter Valid Mobile Number';
        return false;
      } else{
        show_loader();
          params = {
            'sender_details': angular.toJson($scope.resume),
            'csrfmiddlewaretoken': $scope.csrf_token,
          }
          $http({
            method : 'post',
            url : "/cv_request/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
          }).success(function(data, status) {
            hide_loader();
            $scope.resume.mail = "";
            $scope.resume.name = "";
            $scope.resume.mobile = "";
            $scope.validation_message = data.message;
         }); 
      }
    }
    $scope.show_login_popup = function() {
        show_login_popup($scope,'');
    }
    $scope.user_login = function() {
        user_login($scope,$http);
    }
    $scope.show_registration_popup = function() {
        show_registration_popup($scope,'');
    }
    $scope.hide_popup = function() {
        hide_popup($scope,'');
    }
}

function JobSeekerController($scope, $element, $http, $timeout) {
    $scope.login_details = {
      'username': '',
      'password': '',
    }
    job_seeker_initialization_details($scope);
    $scope.photo_img = {};
    $scope.photo_img.src = "";
    $scope.init = function(csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.user_login_detail = true
        $scope.personal_details = false;
        $scope.current_employment_details = false;
        $scope.educational_detail = false;
        $scope.resume_detail = false;
        $scope.photo_detail = false;  
        get_companies($scope, $http);
        get_country_code($scope);
     }
    $scope.get_code = function(){
      var contry_code = $scope.country_code[$scope.personal.country];
      $scope.personal.code = "+"+contry_code[0];
    }
    $scope.show_login_popup = function() {
     show_login_popup($scope,'');
    }
    $scope.user_login = function() {
     user_login($scope,$http);
    }
    $scope.show_registration_popup = function() {
     show_registration_popup($scope,'');
    }
    $scope.hide_popup = function() {
     hide_popup($scope,'');
    }
    $scope.get_companies = function(){
        show_loader();
        $http.get('/jobseeker/get_companies/').success(function(data){
            $scope.companies = data.companies;
            hide_loader();
        }).error(function(data){
            console.log(data || "Request failed");
         });
    }
    $scope.get_stream = function() {
        get_stream($scope);
    }
    $scope.get_master_stream = function() {
        get_master_stream($scope);
    }    
    $scope.add_doctorate = function(){
        add_doctorate($scope);
    }
     $scope.delete_doctorate = function(index){
        delete_doctorate(index,$scope);
    }
    $scope.add_employer = function() {
        add_employer($scope);
    }
    $scope.delete_employer = function(index){
        
        delete_employer(index, $scope);
    }
    $scope.get_prefered_locations = function(country) {
        if ($scope.current_employer.locations.length < 5) {
            if (country.selected){
                country.selected = false;
            } else {
                $scope.current_employer.locations.push(country);
                country.selected = true;
            }
        } else {
            $scope.current_employer_validation_msg = 'Maximum of 5 locations';
        }
    }
   $scope.get_prefered_companies = function(company) {
        if ($scope.current_employer.companies.length < 5){
            $scope.current_employer_validation_msg = '';
            if (company.selected)
                company.selected = false;
             else 
                company.selected = true;
         }else
            $scope.current_employer_validation_msg = 'Maximum of 5 companies';
      }
    $scope.personal_details_validation = function() {
        $scope.personal.dob = $$('#dob')[0].get('value');
        if ($scope.personal.gender == '' || $scope.personal.gender == undefined) {
            $scope.personal_validation = 'Please enter Gender';
            return false;
        } else if ($scope.personal.dob == '' || $scope.personal.dob == undefined) {
            $scope.personal_validation = 'Please enter Date of Birth';
            return false;
        } else if ($scope.personal.marital_status == '' || $scope.personal.marital_status == undefined) {
            $scope.personal_validation = 'Please choose Marital Status';
            return false;
        } else if ($scope.personal.nationality == '' || $scope.personal.nationality == undefined) {
            $scope.personal_validation = 'Please choose Nationality';
            return false;
        } else if ($scope.personal.country == '' || $scope.personal.country == undefined) {
            $scope.personal_validation = 'Please choose Current Location';
            return false;
        } else if ($scope.personal.city == '' || $scope.personal.city == undefined) {
            $scope.personal_validation = 'Please enter City';
            return false;
        } else if ($scope.personal.mobile == '' || $scope.personal.mobile == undefined) {
            $scope.personal_validation = 'Please enter Mobile';
            return false;
        } else if ($scope.personal.mobile != Number($scope.personal.mobile) || $scope.personal.mobile.length > 13 || $scope.personal.mobile.length < 7) {
            $scope.personal_validation = 'Please enter Valid Mobile Number';
            return false;
        } else if($scope.personal.phone.length > 15) {
            $scope.personal_validation = 'Please enter Valid Land line number';
            return false;
        } else if ($scope.personal.alt_email && !(validateEmail($scope.personal.alt_email))) {
            $scope.personal_validation = 'Please enter Valid Alternate Email';
            return false;
        } return true;
    }
    $scope.save_personal_details = function() {
        if ($scope.personal_details_validation()){
            save_personal_details($scope, $http, 'save');
        }
    }

    $scope.user_login_details_validation = function() {
        
        if ($scope.user_login_details.email == '' || $scope.user_login_details.email == undefined || !(validateEmail($scope.user_login_details.email))) {
            $scope.user_login_validation = 'Please enter Email';
            return false;
        } else if ($scope.user_login_details.password == '' || $scope.user_login_details.password == undefined) {
            $scope.user_login_validation = 'Please enter Password';
            return false;
        } else if ($scope.user_login_details.password1 == '' || $scope.user_login_details.password1 == undefined) {
            $scope.user_login_validation = 'Please enter Confirm Password';
            return false;
        } else if ($scope.user_login_details.password != $scope.user_login_details.password1) {
            $scope.user_login_validation = 'Please correctly enter the Password and Confirm Password';
            return false;
        } else if (!$scope.checkbox) {
            $scope.user_login_validation = 'Please agree to the terms and conditions';
            return false;
        }else if ($scope.user_login_details.first_name == '' || $scope.user_login_details.first_name == undefined) {
            $scope.user_login_validation = 'Please enter First Name';
            return false;
        } else if ($scope.user_login_details.last_name == '' || $scope.user_login_details.last_name == undefined) {
            $scope.user_login_validation = 'Please enter Last Name';
            return false;
        } return true;
    }
    $scope.save_user_login_details = function() {
        if ($scope.user_login_details_validation()){
            save_user_login_details($scope, $http, 'save');
        }
    }
    $scope.save_current_employer_details = function() {
      if(current_employer_validation($scope))
        save_current_employer_details($scope, $http, 'save');
    }
    $scope.educational_details_validation = function() {
        if ($scope.educational_details.basic_edu == '' || $scope.educational_details.basic_edu == undefined){
            $scope.educational_validation_msg = 'Please select Basic Education';
            return false;
        } else if ($scope.educational_details.basic_specialization == '' || $scope.educational_details.basic_specialization == undefined || $scope.educational_details.basic_specialization == 'select'){
            $scope.educational_validation_msg = 'Please select Specialisation for Basic Education';
            return false;
        } else if ($scope.educational_details.pass_year_basic == '' || $scope.educational_details.pass_year_basic == undefined || $scope.educational_details.pass_year_basic == 'select'){
            $scope.educational_validation_msg = 'Please select the Year of Passing';
            return false;
        } else if ($scope.educational_details.masters_edu != '' && ($scope.educational_details.master_specialization == '' || $scope.educational_details.master_specialization == undefined || $scope.educational_details.master_specialization == 'select')){
            $scope.educational_validation_msg = 'Please select Specialization for Masters Education ';
            return false;
        } return true;
    }
    $scope.save_educational_details = function() {
        if ($scope.educational_details_validation()){
            save_educational_details($scope, $http, 'save');
        }
    }
    $scope.resume_validation = function() {
        if ($scope.resume_details.resume_title == '' || $scope.resume_details.resume_title == undefined){
            $scope.resume_validation_message = 'Please enter a Resume title';
            return false;
        } else if (($scope.resume_doc.src == '' || $scope.resume_doc.src == undefined) && ($scope.resume_details.resume_text == '' || $scope.resume_details.resume_text == undefined)) {
            $scope.resume_validation_message = 'Please upload the C V or copy paste your resume  ';
            return false;
        }
        if($scope.resume_doc.src){
          var split_name = $scope.resume_doc.src.name.split('.');
          split_name = split_name[split_name.length - 1];
          var extensions = ['doc','DOC', 'docx', 'DOCX', 'pdf', 'PDF', 'txt', 'TXT', 'odt', 'ODT', 'sxw', 'SXW',]
          var index = extensions.indexOf(split_name);
          if(index == -1){
              $scope.resume_validation_message = "Please upload a valid document file";
              return false;
          }
        } 
        return true;
    }
    $scope.save_resume_details = function() {
        if ($scope.resume_validation()) {
            save_resume_details($scope, $http, 'save');
        }
    }
    // $scope.photo_validation = function() {
    //     if ($scope.photo_img.src == '' || $scope.photo_img.src == undefined) {
    //         $scope.photo_validation_message = 'Please upload  your photo  ';
    //         return false;
    //     } return true;
    // }
    $scope.save_photo_details = function() {
      if($scope.photo_img.src){
        var split_name = $scope.photo_img.src.name.split('.');
        split_name = split_name[split_name.length - 1];
        var extensions = ['tiff','TIFF', 'gif', 'GIF', 'TIF', 'tif', 'jpeg', 'JPEG', 'jpg', 'JPG', 'jif', 'JIF', 'jfif', 'JFIF', 'jp2', 'JP2', 'psd', 'PSD', 'bmp', 'BMP', 'pcd', 'PCD', 'png', 'PNG', ]
        var index = extensions.indexOf(split_name);
        if(index == -1){
            $scope.photo_validation_message = "Please upload an image file";
        }
        else{
            save_photo_details($scope, $http);
        }
      }
      else{
          save_photo_details($scope, $http);
      }
    }
    $scope.show_login_popup = function() {
      show_popup();
      $scope.login = true;
      $scope.registration = false;
    }
    $scope.show_registration_popup = function() {
      show_popup();
      $scope.login = false;
      $scope.registration = true;
    }
}
function EditJobSeekerController($scope, $element, $http,  $timeout) {
    job_seeker_initialization_details($scope);
    $scope.view_user_login_details = true;
    $scope.view_personal_details = true;
    $scope.view_educational_details = true;
    $scope.view_employment_details = true;
    $scope.view_resume_details = true;
    $scope.view_photo_details = true;
    $scope.photo_img = {};
    $scope.photo_img.src = "";
    
    $scope.init = function(csrf_token, jobseeker_id) {
        $scope.csrf_token = csrf_token;

        $scope.jobseeker_id = jobseeker_id;
        $scope.current_employer.id  = jobseeker_id;
        $scope.educational_details.id = jobseeker_id;

        $scope.user_login_detail = false;       
        $scope.personal_details = false;
        $scope.current_employment_details = false;
        $scope.educational_detail = false;
        $scope.resume_detail = false;
        $scope.photo_detail = false;      
        get_country_code($scope);  
        get_companies($scope, $http);   
    }   
    $scope.get_stream = function() {
        get_stream($scope);
    }
    $scope.get_code = function(){
      var contry_code = $scope.country_code[$scope.personal.country];
      $scope.personal.code = "+"+contry_code[0];
    }
    $scope.get_master_stream = function() {
        get_master_stream($scope);
    } 
    
    $scope.add_doctorate = function(){
        add_doctorate($scope);
    }
    $scope.delete_doctorate = function(index){
        delete_doctorate(index, $scope);
    }
    $scope.add_employer = function() {
        add_employer($scope);
    }
    $scope.delete_employer = function(index) {
        delete_employer(index, $scope);
    }
    $scope.get_prefered_locations = function(country) {
        if ($scope.current_employer.locations.length < 5) {
            $scope.current_employer_validation_msg = '';
        } else {
            $scope.current_employer_validation_msg = 'Maximum of 5 locations';
        }
    }
    $scope.get_prefered_companies = function(company) {
        if ($scope.current_employer.companies.length < 5) {
            $scope.current_employer_validation_msg = '';
        } else {
            $scope.current_employer_validation_msg = 'Maximum of 5 companies';
        }
    }
    $scope.edit_personal_details_validation = function() {
        $scope.personal.dob = $$('#dob')[0].get('value');
        if ($scope.personal.gender == '' || $scope.personal.gender == undefined) {
            $scope.personal_validation = 'Please enter Gender';
            return false;
        } else if ($scope.personal.dob == '' || $scope.personal.dob == undefined) {
            $scope.personal_validation = 'Please enter Date of Birth';
            return false;
        } else if ($scope.personal.marital_status == '' || $scope.personal.marital_status == undefined) {
            $scope.personal_validation = 'Please choose Marital Status';
            return false;
        } else if ($scope.personal.nationality == '' || $scope.personal.nationality == undefined) {
            $scope.personal_validation = 'Please choose Nationality';
            return false;
        } else if ($scope.personal.country == '' || $scope.personal.country == undefined) {
            $scope.personal_validation = 'Please choose Current Location';
            return false;
        } else if ($scope.personal.city == '' || $scope.personal.city == undefined) {
            $scope.personal_validation = 'Please enter City';
            return false;
        } else if ($scope.personal.mobile == '' || $scope.personal.mobile == undefined) {
            $scope.personal_validation = 'Please enter Mobile';
            return false;
        } else if ($scope.personal.mobile != Number($scope.personal.mobile) || $scope.personal.mobile.length > 13 || $scope.personal.mobile.length < 7) {
            $scope.personal_validation = 'Please enter Valid Mobile Number';
            return false;
        } else if($scope.personal.phone.length > 15) {
            $scope.personal_validation = 'Please enter Valid Land line number';
            return false;
        } else if ($scope.personal.alt_email && !(validateEmail($scope.personal.alt_email))) {
            $scope.personal_validation = 'Please enter Valid Alternate Email';
            return false;
        } return true;
    }
    $scope.edit_user_login_validation = function() {
        
        if ($scope.user_login_details.email == '' || $scope.user_login_details.email == undefined || !(validateEmail($scope.user_login_details.email))) {
            $scope.edit_user_login_validation_message = 'Please enter Email';
            return false;
        }else if ($scope.user_login_details.first_name == '' || $scope.user_login_details.first_name == undefined) {
            $scope.edit_user_login_validation_message = 'Please enter First Name';
            return false;
        } else if ($scope.user_login_details.last_name == '' || $scope.user_login_details.last_name == undefined) {
            $scope.edit_user_login_validation_message = 'Please enter Last Name';
            return false;
        }return true;
      }
    $scope.show_user_login_details = function(jobseeker_id){
        get_job_seeker_details($scope, $http);
        $scope.user_login_detail = true;
        hide_jobseeker_details_block($scope);
    }
    $scope.show_personal_details = function(jobseeker_id){
        get_job_seeker_details($scope, $http);
        $scope.personal_details = true;
        hide_jobseeker_details_block($scope);
    }
    $scope.edit_personal_details = function() {
        if ($scope.edit_personal_details_validation()){
            save_personal_details($scope, $http, 'edit');
        }
    }
    $scope.edit_user_login_details = function() {
        if ($scope.edit_user_login_validation()){
            save_user_login_details($scope, $http, 'edit');
        }
    }
    $scope.show_current_employer_details = function(){
        hide_jobseeker_details_block($scope);
        get_job_seeker_details($scope, $http);
        $scope.current_employment_details = true;

        if ($scope.current_employer.employers) {
            if($scope.current_employer.employers.length > 1 && $scope.current_employer.employers.length <= 3){
                for(var i=1; i < $scope.current_employer.employers.length; i++){
                    $scope.employers.push({'employer': ''});
                }
            }
            for(var i=0; i< $scope.current_employer.employers.length; i++) {
                $scope.employers[i].employer = $scope.current_employer.employers[i].employer;
            }
            if ($scope.current_employer.employers.length == 3) {
                $scope.hide_emp = false;
            }
        } 
    }
    $scope.edit_current_employer_details = function() {
      if(current_employer_validation ($scope)){
        save_current_employer_details($scope, $http, 'edit');
      }
    }
    $scope.edit_educational_details_validation = function() {
        
        if ($scope.educational_details.basic_edu == '' || $scope.educational_details.basic_edu == undefined){
            $scope.educational_validation_msg = 'Please select Basic Education';
            return false;
        } else if ($scope.educational_details.basic_specialization == '' || $scope.educational_details.basic_specialization == undefined || $scope.educational_details.basic_specialization == 'select'){
            $scope.educational_validation_msg = 'Please select Specialisation for Basic Education';
            return false;
        } else if ($scope.educational_details.pass_year_basic == '' || $scope.educational_details.pass_year_basic == undefined || $scope.educational_details.pass_year_basic == 'select'){
            $scope.educational_validation_msg = 'Please select the Year of Passing';
            return false;
        } else if ($scope.educational_details.masters_edu != '' && ($scope.educational_details.master_specialization == '' || $scope.educational_details.master_specialization == undefined || $scope.educational_details.master_specialization == 'select')){
            $scope.educational_validation_msg = 'Please select Specialization for Masters Education ';
            return false;
        } else if ($scope.educational_details.masters_edu != '' && ($scope.educational_details.pass_year_masters == '' || $scope.educational_details.pass_year_masters == undefined || $scope.educational_details.pass_year_masters == 'select')){
            $scope.educational_validation_msg = 'Please select Year of Passing for Masters Education ';
            return false;
        } return true;
    }
    $scope.show_educational_details = function(){
        hide_jobseeker_details_block($scope);
        get_job_seeker_details($scope, $http);
        $scope.educational_detail = true;
        if ($scope.educational_details.pass_year_masters == '' || $scope.educational_details.pass_year_masters == undefined) {
            $scope.educational_details.pass_year_masters = '';
        }
        if ($scope.educational_details.doctorate) {
            if($scope.educational_details.doctorate.length > 1 && $scope.educational_details.doctorate.length <= 3){
                for(var i=1; i < $scope.educational_details.doctorate.length; i++){
                    $scope.doctorate.push({'name': ''});
                }
            }
            for(var i=0; i< $scope.educational_details.doctorate.length; i++) {
                $scope.doctorate[i].name = $scope.educational_details.doctorate[i].doctorate;
            }
            if ($scope.educational_details.doctorate.length == 3){
                $scope.hide_doc = false;
            }
        }
        
    }
    $scope.edit_educational_details = function() {
        if ($scope.edit_educational_details_validation()){
            save_educational_details($scope, $http, 'edit');
        }
    }
    $scope.show_resume_details = function(){
        get_job_seeker_details($scope, $http);
        hide_jobseeker_details_block($scope);

        $scope.resume_detail = true;
        
    }
    $scope.edit_resume_validation = function() {
        if ($scope.resume_details.resume_title == '' || $scope.resume_details.resume_title == undefined){
            $scope.resume_validation_message = 'Please enter a Resume title';
            return false;
        } else if ((($scope.resume_doc.src == '' || $scope.resume_doc.src == undefined) && ($scope.resume_details.resume == '' || $scope.resume_details.resume == undefined)) && ($scope.resume_details.resume_text == '' || $scope.resume_details.resume_text == undefined)) {
            $scope.resume_validation_message = 'Please upload the C V or copy paste your resume  ';
            return false;
        } 
        if($scope.resume_doc.src){
          var split_name = $scope.resume_doc.src.name.split('.');
          split_name = split_name[split_name.length - 1];
          var extensions = ['doc','DOC', 'docx', 'DOCX', 'pdf', 'PDF', 'txt', 'TXT', 'odt', 'ODT', 'sxw', 'SXW',]
          var index = extensions.indexOf(split_name);
          if(index == -1){
              $scope.resume_validation_message = "Please upload a valid document file";
              return false;
          }
        } return true;
    }
    $scope.edit_resume_details = function() {
        if ($scope.edit_resume_validation()){
            save_resume_details($scope, $http, 'edit');
        }
    }
    $scope.show_photo_details = function() {
        get_job_seeker_details($scope, $http);
        hide_jobseeker_details_block($scope);
        $scope.photo_detail = true;
    }
/*    $scope.edit_photo_validation = function() {
        if (($scope.photo_details.profile_photo == '' || $scope.photo_details.profile_photo == undefined) && ($scope.photo_img.src == '' || $scope.photo_img.src == undefined)) {
            $scope.photo_validation_message = 'Please upload your photo  ';
            return false;
        } return true;
    }*/
    $scope.edit_photo_details = function() {
      if($scope.photo_img.src){
        var split_name = $scope.photo_img.src.name.split('.');
        split_name = split_name[split_name.length - 1];
        var extensions = ['tiff','TIFF', 'gif', 'GIF', 'TIF', 'tif', 'jpeg', 'JPEG', 'jpg', 'JPG', 'jif', 'JIF', 'jfif', 'JFIF', 'jp2', 'JP2', 'psd', 'PSD', 'bmp', 'BMP', 'pcd', 'PCD', 'png', 'PNG', ]
        var index = extensions.indexOf(split_name);
        if(index == -1){
            $scope.photo_validation_message = "Please upload an image file";
        }
        else{
            save_photo_details($scope, $http,'edit');
        }
      }
      else{
        save_photo_details($scope, $http,'edit');
      }
    }
    $scope.remove_cv = function() {
        $scope.resume_details.resume = '';
        $scope.resume_details.remove_resume = 'true';
    }
}

function RecruiterController($scope, $element, $http, $timeout) {
    $scope.error_flag = false;
    $scope.error_message = '';
    $scope.checkbox = false;
    $scope.user_already_exists = false;
    $scope.employer_id = 0;
    $scope.profile_doc = {};
    $scope.profile_doc.src = "";
    $scope.logo = {};
    $scope.logo.src = "";
    
    $scope.login_details = {
      'username': '',
      'password': '',
    }
	$scope.init = function(csrf_token, user_id) {
		$scope.csrf_token = csrf_token;
    $scope.user_id = user_id;
    get_industries($scope);
	  get_countries($scope);
    get_country_code($scope);
       
        
        $scope.recruiter = {
            'id' : $scope.employer_id,
            'name' : '',
            'industry' : '',
            'email' : '',
            'country' : '',
            'password' : '',
            'mobile' : '',
            'phone' : '',
            'city': '',
            'description': '',
            'logo': '',
            
        } 
        if (user_id) {
            $scope.user_already_exists = true;
            show_loader();
            $http.get('/profile/details/'+$scope.user_id+'/').success(function(data)
            {
                $scope.recruiter = data.recruiter[0]; 
                $('#last_date').val($scope.recruiter.last_date);
                $('#post_date').val($scope.recruiter.post_date);
                hide_loader();
                
            }).error(function(data, status)
            {
                console.log(data || "Request failed");
            });
        }
    }
    
    $scope.get_code = function(){
      var contry_code = $scope.country_code[$scope.recruiter.country];
      $scope.recruiter.code = "+"+contry_code[0];
    }
    $scope.show_login_popup = function() {
        show_login_popup($scope,'');
    }
    $scope.user_login = function() {
        user_login($scope,$http);
    }
    $scope.show_registration_popup = function() {
        show_registration_popup($scope,'');
    }
    $scope.hide_popup = function() {
        hide_popup($scope,'');
    }
    $scope.recruiter_validation = function(){
      $scope.error_message = '';
        if ($scope.recruiter.name == '' || $scope.recruiter.name == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please enter the Company Name';
            return false;
        } else if (!(validateEmail($scope.recruiter.email))){
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a valid Email Id';
            return false;
        } else if ($scope.recruiter.industry == '' || $scope.recruiter.industry == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please choose the Type of Industry';
            return false;
        } else if ($scope.recruiter.password == '' || $scope.recruiter.password == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a Password';
            return false;
        } else if ($scope.recruiter.password != $scope.recruiter.confirm_password ) {
            $scope.error_flag = true;
            $scope.error_message = 'Password Mismatch';
            return false;
        }  else if ($scope.recruiter.country == '' || $scope.recruiter.country == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please choose the Country';
            return false;
        } else if ($scope.recruiter.mobile == '' || $scope.recruiter.mobile == undefined || !Number($scope.recruiter.mobile) || $scope.recruiter.mobile.length > 13 || $scope.recruiter.mobile.length < 7) {
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a Valid Mobile Number';
            return false;        
        } else if ($scope.recruiter.phone!='' && !Number($scope.recruiter.phone) || $scope.recruiter.phone.length > 15) {
              $scope.error_flag = true;
              $scope.error_message = 'Please enter a Valid Land no.';
              return false;            
        } else if ($scope.logo.src == '' || $scope.logo.src == undefined)  {
            $scope.error_message = 'Please upload  your logo  ';
            return false;
        } else if ($scope.profile_doc.src == '' || $scope.profile_doc.src == undefined)  {
            $scope.error_message = 'Please upload  your profile  ';
            return false;
        } else if (!$scope.checkbox) {
            $scope.error_message = 'Please agree to the terms and conditions';
            return false;
        }
        if($scope.logo.src){
          var split_name = $scope.logo.src.name.split('.');
          split_name = split_name[split_name.length - 1];
          var extensions = ['tiff','TIFF', 'gif', 'GIF', 'TIF', 'tif', 'jpeg', 'JPEG', 'jpg', 'JPG', 'jif', 'JIF', 'jfif', 'JFIF', 'jp2', 'JP2', 'psd', 'PSD', 'bmp', 'BMP', 'pcd', 'PCD', 'png', 'PNG', ]
          var index = extensions.indexOf(split_name);
          if(index == -1){
              $scope.error_message = "Please upload an image file for company logo";
              return false;
          }
        }
      return true;
    }

    $scope.save_profile = function(){
        $scope.is_valid = $scope.recruiter_validation();
        if ($scope.is_valid) {
            $scope.error_flag = false;
            $scope.error_message = '';
            if ($scope.recruiter.description == null){
                $scope.recruiter.description = '';
            }
            var url = '/employer/save_recruiter_details/';
            show_loader();
            params = {
                'recruiter_details':angular.toJson($scope.recruiter),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('profile_doc', $scope.profile_doc.src);
            fd.append('logo', $scope.logo.src);
            for(var key in params){
                fd.append(key, params[key]);          
            }
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined
                }
            }).success(function(data, status){
                if(data.result == "error"){
                  $scope.error_message = data.message;
                }
                else{  
                  document.location.href = '/employer/employer_profile/?id='+data.recruiter_id;;
                }
                hide_loader();                                                
            }).error(function(data, status){
                $scope.error_flag = true;
                $scope.error_message = data.message;
                return false;
            });
        }
    }
    $scope.show_login_popup = function() {
      show_popup();
      $scope.login = true;
      $scope.registration = false;
    }
    $scope.show_registration_popup = function() {
      show_popup();
      $scope.login = false;
      $scope.registration = true;
    }
}
function EditRecruiterController($scope, $element, $http, $timeout) {
    $scope.profile_doc = {};
    $scope.profile_doc.src = "";
    $scope.photo_img = {};
    $scope.photo_img.src = "";
    $scope.employer_id = 0;
    $scope.view_employer_details = true;
    $scope.logo = {};
    $scope.logo.src = "";
    $scope.init = function(csrf_token, employer_id) {
        $scope.csrf_token = csrf_token;
        $scope.employer_id = employer_id;
        get_industries($scope);
        get_countries($scope);
        get_country_code($scope);
        $scope.premium_employer = {
            'premium': '',
            'id': '',
        }
        $scope.recruiter = {
            'id' : '',
            'name' : '',
            'industry' : '',
            'email' : '',
            'country' : '',
            'mobile' : '',
            'phone' : '',
            'city': '',
            'description': '',
            'company_profile':'',
            'profile_photo': '',

        } 
    }
    $scope.get_code = function(){
      var contry_code = $scope.country_code[$scope.recruiter.country];
      $scope.recruiter.code = "+"+contry_code[0];
    }
    $scope.save_premium_employer = function(recruiter_id, premium_flag){
        $scope.premium_employer.id = recruiter_id;
        if (premium_flag == 'True') {
            $scope.premium_employer.premium = "False";
        } else {
            $scope.premium_employer.premium = "True";
        }
        show_loader();
        params = {
            'premium_employer': angular.toJson($scope.premium_employer),
            'csrfmiddlewaretoken': $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/save_premium_employer/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status){
            hide_loader();                                                
        })
    }
    $scope.edit_employer_details = function(){
        get_employer_details($scope, $http);
        $scope.view_employer_details = false;
    }
    $scope.edit_recruiter_validation = function(){
        var letters = /^[A-Za-z]+$/;  
        if ($scope.recruiter.name == '' || $scope.recruiter.name == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please enter the Company Name';
            return false;
        } else if (!(validateEmail($scope.recruiter.email))){
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a valid Email Id';
            return false;
        } else if ($scope.recruiter.industry == '' || $scope.recruiter.industry == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please choose the Type of Industry';
            return false;
        }  else if ($scope.recruiter.mobile == '' || $scope.recruiter.mobile == undefined || $scope.recruiter.mobile.match(letters) || $scope.recruiter.mobile.length > 13 || $scope.recruiter.mobile.length < 7 ) {
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a Valid Mobile Number';
            return false;        
        } else if($scope.recruiter.phone.length > 15) {
            $scope.personal_validation = 'Please enter Valid Land line number';
            return false;
        } else if ($scope.recruiter.phone != '' || $scope.recruiter.phone != undefined) {
            if ($scope.recruiter.phone.match(letters)) {
              $scope.error_flag = true;
              $scope.error_message = 'Please enter a Valid Land no.';
              return false;
        }
        }else if ($scope.profile_doc.src == '' || $scope.profile_doc.src == undefined)  {
            $scope.error_message = 'Please upload  your profile  ';
            return false;
        }
        if($scope.logo.src){
          var split_name = $scope.logo.src.name.split('.');
          split_name = split_name[split_name.length - 1];
          var extensions = ['tiff','TIFF', 'gif', 'GIF', 'TIF', 'tif', 'jpeg', 'JPEG', 'jpg', 'JPG', 'jif', 'JIF', 'jfif', 'JFIF', 'jp2', 'JP2', 'psd', 'PSD', 'bmp', 'BMP', 'pcd', 'PCD', 'png', 'PNG', ]
          var index = extensions.indexOf(split_name);
          if(index == -1){
              $scope.error_message = "Please upload an image file for company logo";
              return false;
          }
        }
        return true;
    }

    $scope.save_edit_profile = function(){
        $scope.is_valid = $scope.edit_recruiter_validation();
        if ($scope.is_valid) {
            $scope.error_flag = false;
            $scope.error_message = '';
            $scope.employer_id = $scope.recruiter.id;
            if ($scope.recruiter.description == null){
                $scope.recruiter.description = '';
            }
            if ($scope.recruiter.photo == null){
                $scope.recruiter.photo = '';
            }
            var url = '/employer/save_recruiter_details/';
            params = {
                'recruiter_details':angular.toJson($scope.recruiter),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('profile_doc', $scope.profile_doc.src);
            if ($scope.logo != undefined)
              fd.append('logo', $scope.logo.src);
            
            for(var key in params){
                fd.append(key, params[key]);          
            }
            show_loader(); 
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined
                }
            }).success(function(data, status){
                
                document.location.href = '/employer/employer_profile/?id='+data.recruiter_id;;
                hide_loader(); 
            }).error(function(data, status){
                $scope.error_flag = true;
                $scope.error_message = data.message;
                return false;
            });
        }
    }
}

function  JobPostingController($scope,$element,$http,$timeout){
    $scope.Min = [];
    $scope.Max = [];
    $scope.edit =1;
    $scope.is_new_company = false;
    $scope.existing_job = '------Copy From existing job----';
    $scope.jobpost = {
        'title':'',
        'code': '',
        'company': '',
        'summary': '',
        'details': '',
        'salary': '',
        'currency': '',
        'skills': '',
        'location': '-select-',
        'industry': '-select-',
        'category': '-select-',
        'requirement': '-select-',
        'role': '-select-',
        'specialisation': '',
        'nationality': '',
        'last_date': '',
        'name': '',
        'phone': '',
        'email': '',
        'profile': '',
        'min':'-min-',
        'max':'-max-',
    }

	$scope.init = function(csrf_token,id) {
		$scope.csrf_token = csrf_token;
		$scope.job_details_pdf = {};
    $scope.job_details_pdf.src = "";
		get_countries($scope);
		get_nationalities($scope);
		get_industries($scope);
		get_functions($scope);
		get_education_required($scope);
    get_req_education_specialization($scope);
    get_req_roles($scope);    
    get_currencies($scope);
    $scope.job_id = id;    
    new Picker.Date($$('#last_dob'), {
            timePicker: false,
            positionOffset: {x: 5, y: 0},
            pickerClass: 'datepicker_bootstrap',
            useFadeInOut: !Browser.ie,
            format:'%d/%m/%Y',
        });
    new Picker.Date($$('#post_dob'), {
            timePicker: false,
            positionOffset: {x: 5, y: 0},
            pickerClass: 'datepicker_bootstrap',
            useFadeInOut: !Browser.ie,
            format:'%d/%m/%Y',
        });
    for(var i=0; i<=50; i++){
        $scope.Min.push(i);
        $scope.Max.push(i);
    } 
    $http.get('/employer/post_job').success(function(data)
    {
        
        $scope.jobpost.company_name = data.company_name;
    }).error(function(data, status)
    {
        console.log(data || "Request failed");
    });

    if ($scope.job_id){
      $http.get('/employer/details/'+$scope.job_id+'/').success(function(data)
            {
                $scope.jobpost = data.jobpost[0]; 
                $scope.func_roles = $scope.req_roles[$scope.jobpost.category];
                
                $('#last_dob').val($scope.jobpost.last_date);
            }).error(function(data, status)
            {
                console.log(data || "Request failed");
            });
    }		
    
    $scope.get_req_role = function(){
      var req_category = $scope.jobpost.category;
      $scope.func_roles = $scope.req_roles[req_category];
      $scope.jobpost.role = '';
    }
  }

  $scope.form_validation_postjob = function(){
    var letters = /^[A-Za-z]+$/;  
    $scope.jobpost.last_date = $('#last_dob').val();
    if ($scope.jobpost.company == '' || $scope.jobpost.company == undefined) {
      $scope.jobpost.company = $('#company_name').val();
    }
    if ($scope.jobpost.title == ''|| $scope.jobpost.title == undefined){
        $scope.error_flag = true;
        $scope.error_message = 'Please provide a Job Title';
        return false;
    } else if ($scope.jobpost.company == '' || $scope.jobpost.company == undefined) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide Company Name';
        return false; 
    }  else if ($scope.jobpost.summary == '' || $scope.jobpost.summary == undefined) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide Job summary';
        return false;
    } else if ($scope.jobpost.salary == null || $scope.jobpost.salary == '' || $scope.jobpost.salary == undefined){
        $scope.error_flag = true;
        $scope.error_message = 'Please enter Salary';
        return false;
    }  else if ($scope.jobpost.salary != '' && ($scope.jobpost.currency == '' || $scope.jobpost.currency == undefined)) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Currency';
        return false;
    } else if ($scope.jobpost.skills == '' || $scope.jobpost.skills == undefined) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Required Skills';
        return false;
    } else if ($scope.jobpost.min != 0 && ($scope.jobpost.min == '' || $scope.jobpost.min == undefined || $scope.jobpost.min == '-min-') ) {      
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the minimum Experience Required';
        return false;      
    } else if ($scope.jobpost.max != 0 && ($scope.jobpost.max == '' || $scope.jobpost.max == undefined || $scope.jobpost.max == '-max-') ) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the maximum Experience Required';
        return false;
    } else if ($scope.jobpost.location == '' || $scope.jobpost.location == undefined || $scope.jobpost.location == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Job location';
        return false;
    } else if ($scope.jobpost.industry == '' || $scope.jobpost.industry == undefined || $scope.jobpost.industry == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Industry';
        return false;
    } else if ($scope.jobpost.category == '' || $scope.jobpost.category == undefined || $scope.jobpost.category == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Category/Function';
        return false;
    } else if ($scope.jobpost.role == '' || $scope.jobpost.role == undefined || $scope.jobpost.role == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please select the role/position';
        return false;
    } else if ($scope.jobpost.requirement == '' || $scope.jobpost.requirement == undefined || $scope.jobpost.requirement == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Education Required';
        return false;
    } else if ($scope.jobpost.nationality == '' || $scope.jobpost.nationality == undefined || $scope.jobpost.nationality == '-select-') {
        $scope.error_flag = true;
        $scope.error_message = 'Please select Nationality';
        return false;
    } else if ($scope.jobpost.name == '' || $scope.jobpost.name == undefined) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the Name of the Job Owner';
        return false;
    } else if ($scope.jobpost.phone == '' || $scope.jobpost.phone == undefined || $scope.jobpost.phone.match(letters)) {
        $scope.error_flag = true;
        $scope.error_message = 'Please enter a Valid Phone Number';
        return false;
    } else if (!(validateEmail($scope.jobpost.email))) {
        $scope.error_flag = true;
        $scope.error_message = 'Please provide a Valid Email Id';
        return false;
    } 
    if ($scope.jobpost.last_date != '' || $scope.jobpost.last_date != undefined) {
        var start_date = new Date();
        var date_value = $scope.jobpost.last_date.split('/');
        var end_date = new Date(date_value[2],date_value[1]-1, date_value[0]);
        if(start_date > end_date){
          $scope.error_flag = true;
          $scope.error_message = 'Please check the last date';
          return false;
        }
    } 
    return true;
    }
    $scope.show_posted_jobs = function() {
        var url = '/employer/posted_jobs/';
        document.location.href = url;
    }
    $scope.save_job = function(){
        $scope.jobpost.last_date = $('#last_dob').val();       
        $scope.is_valid = $scope.form_validation_postjob();  

        if ($scope.is_valid) {
            $scope.error_flag = false;
            $scope.error_message = '';
            if ($scope.jobpost.post_date == null) {
                $scope.jobpost.post_date = '';
            }
            if ($scope.jobpost.last_date == null) {
                $scope.jobpost.last_date = '';
            }
            if($scope.jobpost.specialisation == "")
              $scope.jobpost.specialisation = "Any";
            var file = $scope.job_details_pdf.src;
            var edit = $scope.edit;
            show_loader();
            params = {
                'jobpost':angular.toJson($scope.jobpost),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('job_details_pdf', $scope.job_details_pdf.src);
            for(var key in params){
              fd.append(key, params[key]);
            }
            if($scope.job_id) {
              var url = "/employer/edit/"+$scope.job_id+"/";
            } else {
                if(edit == 1){
                    var url = "/employer/post_job/";               
                }              
            } 
             
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined
                }
                
            }).success(function(data, status){
                $scope.id = data.id;
                $scope.edit = $scope.edit + 1;  
                var url = '/employer/posted_jobs/';
                document.location.href = url;
                hide_loader(); 
            }).error(function(data, status){
                 console.log(data);
            });
        }        
    }
    $scope.view_posted_jobs = function() {
        var url = '/posted_jobs/';
        document.location.href = url;
    }
}
function SearchController($scope,$element,$http,$timeout){
    $scope.is_keyword = false;
    $scope.is_location = false;
    $scope.is_exp = false;
    $scope.is_function = false;
    $scope.experience = 'select';
    $scope.functional_area = 'select';
    $scope.experiences = [];
    $scope.validate_msg = "";
    $scope.error_message = "";
    $scope.alert_style = {};
    $scope.search = {
        'keyword' : '',
        'location' : '',
        'experience' : '',
        'function_name' : '',
        'industry' : '',
        'skills': ''
    }
    $scope.login_details = {
      'username': '',
      'password': '',
    }
    
    $scope.init = function(csrf_token, search_location, search_keyword, search_experience, search_function_name, search_industry, skills) {
        $scope.csrf_token = csrf_token;
        $scope.search = {
            'keyword' : search_keyword,
            'location' : search_location,
            'experience' : search_experience,
            'function_name' : search_function_name,
            'industry' : search_industry,
            'skills': skills
        }
        $scope.skill = search_keyword;
        for(var i=0; i<=30; i++) {
            $scope.experiences.push(i);
        }
        $scope.no_jobs = false;

        get_functions($scope);
        get_industries($scope);    
        $scope.quick_search();   
    }
    $scope.validate_search = function(){
      if($scope.search.experience == "" || $scope.search.experience == undefined){
        $scope.validate_msg = "Please specify the experience";
        return false;
      } else if($scope.search.function_name == "" || $scope.search.function_name == undefined){
        $scope.validate_msg = "Please select the functional area ";
        return false;
      } else if($scope.search.industry == "" || $scope.search.industry == undefined){
        $scope.validate_msg = "Please select the industry type";
        return false;
      }
      return true;
    }
    $scope.job_search  = function() {   
      if($scope.validate_search()) {
        $scope.validate_msg = "";
        var url = '/jobseeker/job_search/?location='+$scope.search.location+'&skills='+$scope.search.skills+'&industry='+$scope.search.industry+'&function='+$scope.search.function_name+'&keyword='+$scope.search.keyword+'&experience='+$scope.search.experience;
        $http.get(url).success(function(data)
        {
            $scope.jobs = data.jobs; 
            $scope.count = data.count;
            if(data.jobs.length <= 0){
              $scope.no_jobs = true;
            } else {
              $scope.no_jobs = false;
            }
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });
      }
    }
    $scope.quick_search  = function() {   
        $scope.validate_msg = "";
        var url = '/jobseeker/job_search/?location='+$scope.search.location+'&skills='+$scope.search.skills+'&industry='+$scope.search.industry+'&function='+$scope.search.function_name+'&keyword='+$scope.search.keyword+'&experience='+$scope.search.experience;
        $http.get(url).success(function(data)
        {
            $scope.jobs = data.jobs; 
            $scope.count = data.count;
            if(data.jobs.length <= 0){
              $scope.no_jobs = true;
            } else {
              $scope.no_jobs = false;
            }
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });
    }
    $scope.show_login_popup = function() {
     show_login_popup($scope,'');
    }
    $scope.user_login = function() {
     user_login($scope,$http);
    }
    $scope.show_registration_popup = function() {
     show_registration_popup($scope,'');
    }
    $scope.hide_popup = function() {
     hide_popup($scope,'');
    }
   
}

function CandidateSearchController($scope,$element,$http,$timeout){
  $scope.init = function(){
    get_industries($scope);
    get_functions($scope);
    get_basic_education($scope);
    get_basic_education_specialization($scope);
    $scope.experience = [];
    $scope.count = -1;
    $scope.no_candidate = false;
    $scope.candidates_data_table = false;
    $scope.search_candidate = {
      'functions': '',
      'industry': '',
      'skills': '',
      'years': '',
      'months': ''
    }
    $scope.educational_details = {
      basic_specialization: '',
      basic_edu: '',
    }
    for(var i=0; i<=50; i++)
      $scope.experience.push(i);   
    }
    $scope.get_stream = function() {
        get_stream($scope);
    }
    $scope.validate_search_candidates = function(){
      if($scope.educational_details.basic_edu == ""){
        $scope.error_message = "Please select the educational qualification required";
        return false;
      }
      return true;       
    }
    $scope.search_candidates = function(){
      if ($scope.validate_search_candidates()) {
        $scope.error_message = '';
        var url = '/employer/search_candidates/?functions='+$scope.search_candidate.functions+'&industry='+$scope.search_candidate.industry+'&months='+$scope.search_candidate.months+'&years='+$scope.search_candidate.years+'&skills='+$scope.search_candidate.skills+'&basic_edu='+$scope.educational_details.basic_edu+'&basic_specialization='+$scope.educational_details.basic_specialization;
        $http.get(url).success(function(data) {
            $scope.candidates_data = data.candidates_data;
            $scope.count = data.count;
            if($scope.candidates_data.length > 0){

              $scope.candidates_data_table = true;
              $scope.no_candidate = false;
            }              
            else
              $scope.no_candidate = true;
        })
      }
    }
    $scope.resume_download = function(jobseeker_id){

    }
}

function ReportController($scope,$element,$http,$timeout){
  get_functions($scope);
  get_companies($scope, $http);
  get_countries($scope);
  $scope.select_report = function(){
    if($scope.report_type == '' || $scope.report_type == 4 || $scope.report_type == 5|| $scope.report_type == 6){
      $scope.show_domain = false;
      $scope.show_employer = false;
      $scope.show_location = false;
      $scope.show_jobs = false;
      $scope.show_button = true;
      $scope.show_companies = false;
    }
    if($scope.report_type == 1){
      $scope.show_domain = true;
      $scope.show_employer = false;
      $scope.show_location = false;
      $scope.show_jobs = false;
      $scope.show_button = true;
      $scope.show_companies = false;
    }
    else if($scope.report_type == 2){
      $scope.show_domain = false;
      $scope.show_employer = true;
      $scope.show_location = false;
      $scope.show_jobs = false;
      $scope.show_button = true;
      $scope.show_companies = false;
    }
    else if($scope.report_type == 3){
      $scope.show_domain = false;
      $scope.show_employer = false;
      $scope.show_location = true;
      $scope.show_jobs = false;
      $scope.show_button = true;
      $scope.show_companies = false;
    }
    else if($scope.report_type == 7){
      get_jobs($scope,$http);
      $scope.show_domain = false;
      $scope.show_employer = false;
      $scope.show_location = false;
      $scope.show_jobs = true;
      $scope.show_button = false;
      $scope.show_companies = false;
    }
  }
  $scope.view_report = function(id){
    if($scope.report_type == '' || $scope.report_type == undefined){
      $scope.validation_message = "Please select the report type";
      return false;
    } else if($scope.report_type == 1){
        if($scope.domain == '' || $scope.domain ==  undefined){
          $scope.validation_message = "Please select the domain";
        }
        else{
          $scope.validation_message = "";
          document.location.href = '/reports/reports/?report_type='+$scope.report_type+'&domain='+$scope.domain;
        }
    } else if($scope.report_type == 2){
        if($scope.employers == '' || $scope.employers ==  undefined){
          $scope.validation_message = "Please select the employer";
          return false;
        }
        else{
          $scope.validation_message = "";
          document.location.href = '/reports/reports/?report_type='+$scope.report_type+'&employer='+$scope.employers;
        }
      
    } else if($scope.report_type == 3){
        if($scope.country == '' || $scope.country ==  undefined){
          $scope.validation_message = "Please select the country";
          return false;
        }
        else{
          $scope.validation_message = "";
          document.location.href = '/reports/reports/?report_type='+$scope.report_type+'&country='+$scope.country;
        }
      
    } else if($scope.report_type == 4 || $scope.report_type == 5 || $scope.report_type == 6){
          $scope.validation_message = "";
          document.location.href = '/reports/reports/?report_type='+$scope.report_type;
    } else if($scope.report_type == 7){        
        $scope.validation_message = "";
        document.location.href = '/reports/reports/?report_type='+$scope.report_type+'&job_id='+id;
    } 

    return true;
  }  

}

