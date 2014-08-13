 function validateEmail(email) { 
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function search_by_location(search_type){
  if (search_type == 'location') {
    var url = '/jobseeker/search/?location=location';
    document.location.href = url;
  }
  if (search_type == 'skills') {
    var url = '/jobseeker/search/?skills=skills';
    document.location.href = url;
  }
}

function search_by_skills(search_type){
  if (search_type == 'skills') {
    var url = '/jobseeker/search/?skills=skills';
    document.skills.href = url;
  }
}

function search_by_function(search_type){
  if (search_type == 'function') {
    var url = '/jobseeker/search/?function=function';
    document.function.href = url;
  }
}

function search_by_industry(search_type){
  if (search_type == 'industry') {
    var url = '/jobseeker/search/?industry=industry';
    document.industry.href = url;
  }
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
                var url = '/jobseeker/search_jobs/?location='+$scope.search.location;
                document.location.href = url;
            }
        } else if (search_option == 'skills') {
            if (($scope.search.keyword == '' || $scope.search.keyword == undefined)) {
                $scope.error_flag = true;
                $scope.error_message = 'Please enter value for the skills';
                
            }  else {
                $scope.error_flag = false;
                $scope.error_message = '';
                var url = '/jobseeker/search_jobs/?skills='+$scope.search.keyword;
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
                var url = '/jobseeker/search_jobs/?location='+$scope.search.location+'&skills='+$scope.search.keyword+'&experience='+$scope.search.experience+'&function='+$scope.search.function_name+'&industry='+$scope.search.industry+'&search=true';
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
          var url = '/jobseeker/search_jobs/?location='+$scope.job_location+'&skills='+$scope.skill+'&experience='+$scope.experience+'&function='+$scope.functional_area;
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
          'Ashmore and Cartier Islands',
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
          'Coral Sea Islands',
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
          'Europa Island',
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
          'Glorioso Islands',
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
          'Jan Mayen',
          'Japan',
          'Jordan',
          'Juan de Nova Island',
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
          'Paracel Islands',
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
          'Saint Helena',
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
          'Spratly Islands',
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
          'Timor-Leste',
          'Togo',
          'Tonga',
          'Trinidad and Tobago',
          'Tromelin Island',
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
        'Import / Export',
        'Iron/ Steel',
        'ISP',
        'Law Enforcement/Security Services',
        'Leather',
        'Market Research',
        'Medical Transcription',
        'Mining',
        'NGO',
        'Import / Export',
        'Iron/ Steel',
        'ISP',
        'Law Enforcement/Security Services',
        'Leather',
        'Market Research',
        'Medical Transcription',
        'Mining',
        'NGO',
        'Shipping/ Marine Services',
        'Travel/ Tourism',
        'Tyres',
        'Wood',
        'Travel/ Tourism',
        'Other',
        
    ]
}


function get_functions($scope){
    $scope.functions = [
        'Construction',
        'Banking/Financial Services/Broking',
        'Oil/ Gas/ Petroleum',
        'IT - Software Services',
        'Medical/Healthcare/Diagnistics/Medical Devices',
        'Hotels/Hospitality/Tourism/Recreative',
        'Advertising/Pr/Events',
        'Agriculture/Dairy/Poultry',
        'Hotels/Hospitality/Tourism/Recreative',
        'Air Conditioning/Refrigeration',
        'Airline/Aviation',
        'Architecture/Interior Designing',
        'Automotive/Auto Ancillary',
        'Chemicals/PetroChemical',
        'Consumer Durables/Consumer Electronics',
        'Courier/Logistics/Transportation/Warehousing',
        'Defence/Militarnmenty/Government',
        'Education/Training/Teaching',
        'Export/Import/General Trading',
        'Fertilizers/Pesticides',
        'FMGG/Foods/Beverage',
        'Fresher - No industry Experience/Not Employed/Intern',
        'Gems/ Jwellery',
        'Industrial Products/Heavy Machinery',
        'Insurance',
        'Internet/E-Commerece/Dotcom',
        'IT - Hardware and Networking',
        'Media/Entertainment/Publishing',
        'Metals/Steel/Iron/Aluminium/Foundry/Electroplating',
        'Mining/Forestry/Fishing',
        'NGO/Social Services',
        'Office Automation/Equipment/Stationary',
        'Paper',
        'Pharma/Biotech/Clinical Research',
        'Plastics/Rubber',
        'Power/Energy',
        'Printing/Packing',
        'Real Estate',
        'Recruitment/Placement Firm',
        'Restaurants/Catering',
        'Retail',
        'Security/Law Enforcement',
        'Shipping/Freight',
        'Telecom/ISP',
        'Textiles/Garments/Accesories/Fashion',
        'Tyres',
        'Other',
    ]
}

function get_currencies($scope){
    $scope.currencies = ['US Dollars',
        'UK Pound',
        'Indian Rupees', 
        'UAE Dhirhams',
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
    $http.get('/jobseeker/edit_details/'+$scope.jobseeker_id+'/').success(function(data)
    {
        $scope.personal = data.personal[0]; 
        $scope.current_employer = data.current_employer[0]; 
        console.log($scope.current_employer);
        $scope.educational_details = data.educational_details[0];
        $scope.resume_details = data.resume_details[0];
        $scope.photo_details = data.photo_details[0];
        if ($scope.educational_details.pass_year_masters == null) {
            $scope.educational_details.pass_year_masters = '';
        }
        if ($scope.current_employer.years == null) {
            $scope.current_employer.years = '';
        }
        if ($scope.current_employer.locations.length > 0) {
            for (var j=0; j<$scope.countries.length; j++) {
                for (var i=0;i<$scope.current_employer.locations.length; i++) {
                    if ($scope.current_employer.locations[i].location == $scope.countries[j]) {
                        console.log($scope.current_employer.locations[i].location, $scope.countries[j]);
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
        console.log($scope.companies);
    }).error(function(data, status)
    {
        console.log(data || "Request failed");
    });
}
function get_companies($scope, $http) {
    $http.get('/jobseeker/get_companies/').success(function(data){
        $scope.companies = data.companies;  
     }).error(function(data){
        console.log(data || "Request failed");
    });    
}
function get_employer_details($scope, $http) {
    $http.get('/employer/edit_recruiter_profile/'+$scope.employer_id+'/').success(function(data)
    {
      $scope.recruiter = data.recruiter[0]; 
       
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
    $scope.personal = {
        'id': $scope.job_seeker_id,
        'password': '',
        'password1': '',
        'first_name': '',
        'last_name': '',
        'gender': '',
        'dob':'',
        'marital_status': '',
        'nationality': '',
        'country': '',
        'city': '',
        'mobile': '',
        'alt_email': '',
    }
    $scope.current_employer = {
        'id': $scope.job_seeker_id,
        'years': '0',
        'months': '0',
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
    $scope.view_personal_details = false;
    $scope.view_educational_details = false;
    $scope.view_employment_details = false;
    $scope.view_resume_details = false;
}
function current_employer_validation($scope) {
    if (($scope.current_employer.salary != null || $scope.current_employer.salary != '' || $scope.current_employer.salary != undefined) && $scope.current_employer.salary != Number($scope.current_employer.salary)){
        $scope.current_employer_validation_msg = 'Please enter a Valid Amount for Salary';
        return false;
    } else if ($scope.current_employer.salary != '' && ($scope.current_employer.currency == '' || $scope.current_employer.currency == undefined)) {
        $scope.current_employer_validation_msg = 'Please provide the Currency';
        return false;
    } else if ($scope.current_employer.skills == '' || $scope.current_employer.skills == undefined){
        $scope.current_employer_validation_msg = 'Please enter Key Skills';
        return false;
    } else if ($scope.current_employer.locations.length == 0 || $scope.current_employer.locations == ""){
        $scope.current_employer_validation_msg = 'Please choose Prefered Location';
        return false;
    } else if ($scope.current_employer.locations.length > 5){
        $scope.current_employer_validation_msg = 'Please choose a maximum of 5 Locations';
        return false;
    } else if ($scope.current_employer.companies.length == 0 || $scope.current_employer.companies == ""){
        $scope.current_employer_validation_msg = 'Please choose Prefered Company';
        return false;
    } else if ($scope.current_employer.companies.length > 5){
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
function add_doctorate($scope){
    if($scope.doctorate.length <3) {
        $scope.doctorate.push({'name':''});
    }
    if($scope.doctorate.length == 3){
      $scope.hide_doc = false;
    }
}
function save_resume_details($scope, $http, type) {
    if($scope.resume_details.is_resume_show == true)
        $scope.resume_details.is_resume_show = "true";
    else
        $scope.resume_details.is_resume_show = "false";
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
    });
}
function save_photo_details($scope, $http) {
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
            $scope.photo_validation_message = data.message;
        }
    });
}
function save_educational_details($scope, $http, type) {
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
    });
}
function save_current_employer_details($scope, $http, type) {
    if (current_employer_validation($scope)) {
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
        });
    }
}
function save_personal_details($scope, $http, type) {
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
    });
}
/* End common js methods */

function HomeController($scope, $element, $http, $timeout, share, $location)
{
    $scope.is_keyword = false;
    $scope.is_location = false;
    $scope.is_exp = false;
    $scope.is_function = false;
    $scope.experiences = [];
    $scope.experience = 'select';
    $scope.functional_area = 'select';

    $scope.init = function(csrf_token, search_location, search_keyword, search_experience, search_function_name, search_industry, search_flag) {
        $scope.csrf_token = csrf_token;
        for(var i=0; i<=30; i++) {
            $scope.experiences.push(i);
        }
        get_functions($scope);
        $scope.search_flag = search_flag;
        if(!($scope.search_flag)){
          if(search_location != '' || search_location != undefined){
            $scope.job_location = search_location;
            console.log($scope.job_location);
          }
          if (search_keyword != '' || search_keyword != undefined) {
            $scope.skill = search_keyword;
            console.log($scope.skill);
          }
          if (search_experience != '' || search_experience != undefined) {
            $scope.experience = search_experience;
            console.log($scope.experience);
          }
          if (search_function_name != '' || search_function_name != undefined) {
            $scope.functional_area = search_function_name;
            console.log($scope.functional_area);
          }
        
        }
    }
    $scope.post_cv = function(){
        document.location.href = '/job_seeker_registration/';
    }
    $scope.job_search  = function() {
        search_job($scope, '');
    }
}

function JobSeekerController($scope, $element, $http, $timeout) {
    job_seeker_initialization_details($scope);
    $scope.init = function(csrf_token) {
        $scope.csrf_token = csrf_token;
        $scope.personal_details = true;
        $scope.current_employment_details = false;
        $scope.educational_detail = false;
        $scope.resume_detail = false;
        $scope.photo_detail = false;  
        get_companies($scope, $http);
     }
    $scope.get_companies = function(){
      $http.get('/jobseeker/get_companies/').success(function(data){
        $scope.companies = data.companies;
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
    $scope.add_employer = function() {
        add_employer($scope);
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
        if ($scope.personal.email == '' || $scope.personal.email == undefined || !(validateEmail($scope.personal.email))) {
            $scope.personal_validation = 'Please enter Email';
            return false;
        } else if ($scope.personal.password == '' || $scope.personal.password == undefined) {
            $scope.personal_validation = 'Please enter Password';
            return false;
        } else if ($scope.personal.password1 == '' || $scope.personal.password1 == undefined) {
            $scope.personal_validation = 'Please enter Confirm Password';
            return false;
        } else if ($scope.personal.password != $scope.personal.password1) {
            $scope.personal_validation = 'Please correctly enter the Password and Confirm Password';
            return false;
        } else if ($scope.personal.first_name == '' || $scope.personal.first_name == undefined) {
            $scope.personal_validation = 'Please enter First Name';
            return false;
        } else if ($scope.personal.last_name == '' || $scope.personal.last_name == undefined) {
            $scope.personal_validation = 'Please enter Last Name';
            return false;
        } else if ($scope.personal.gender == '' || $scope.personal.gender == undefined) {
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
        } else if ($scope.personal.mobile != Number($scope.personal.mobile) || $scope.personal.mobile.length > 15) {
            $scope.personal_validation = 'Please enter Valid Mobile Number';
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
    $scope.save_current_employer_details = function() {
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
        } return true;
    }
    $scope.save_resume_details = function() {
        if ($scope.resume_validation()) {
            save_resume_details($scope, $http, 'save');
        }
    }
    $scope.photo_validation = function() {
        if ($scope.photo_img.src == '' || $scope.photo_img.src == undefined) {
            $scope.photo_validation_message = 'Please upload  your photo  ';
            return false;
        } else if (!$scope.checkbox) {
            $scope.photo_validation_message = 'Please agree to the terms and conditions';
            return false;
        } return true;
    }
    $scope.save_photo_details = function() {
        if ($scope.photo_validation()){
            save_photo_details($scope, $http);
        }
    }
}
function EditJobSeekerController($scope, $element, $http, $timeout) {
    job_seeker_initialization_details($scope);
    $scope.view_personal_details = true;
    $scope.view_educational_details = true;
    $scope.view_employment_details = true;
    $scope.view_resume_details = true;
    
    $scope.init = function(csrf_token, jobseeker_id) {
        $scope.csrf_token = csrf_token;
        $scope.jobseeker_id = jobseeker_id;
        $scope.personal_details = false;
        $scope.current_employment_details = false;
        $scope.educational_detail = false;
        $scope.resume_detail = false;
        $scope.photo_detail = false;      
        get_job_seeker_details($scope, $http);   
        get_companies($scope, $http);      
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
    $scope.add_employer = function() {
        add_employer($scope);
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
        if ($scope.personal.email == '' || $scope.personal.email == undefined || !(validateEmail($scope.personal.email))) {
            $scope.personal_validation = 'Please enter Email';
            return false;
        }else if ($scope.personal.first_name == '' || $scope.personal.first_name == undefined) {
            $scope.personal_validation = 'Please enter First Name';
            return false;
        } else if ($scope.personal.last_name == '' || $scope.personal.last_name == undefined) {
            $scope.personal_validation = 'Please enter Last Name';
            return false;
        } else if ($scope.personal.gender == '' || $scope.personal.gender == undefined) {
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
        } else if ($scope.personal.mobile != Number($scope.personal.mobile) || $scope.personal.mobile.length > 15) {
            $scope.personal_validation = 'Please enter Valid Mobile Number';
            return false;
        } else if ($scope.personal.alt_email && !(validateEmail($scope.personal.alt_email))) {
            $scope.personal_validation = 'Please enter Valid Alternate Email';
            return false;
        } return true;
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
    $scope.show_current_employer_details = function(){
        hide_jobseeker_details_block($scope);
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
        save_current_employer_details($scope, $http, 'edit');
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
        get_stream($scope);
        get_master_stream($scope);
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
        $scope.educational_detail = true;
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
    $scope.edit_photo_validation = function() {
        if (($scope.photo_details.profile_photo == '' || $scope.photo_details.profile_photo == undefined) && ($scope.photo_img.src == '' || $scope.photo_img.src == undefined)) {
            $scope.photo_validation_message = 'Please upload your photo  ';
            return false;
        } return true;
    }
    $scope.edit_photo_details = function() {
        if ($scope.edit_photo_validation()){
            save_photo_details($scope, $http);
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
    $scope.user_already_exists = false;
    $scope.employer_id = 0;
    $scope.profile_doc = {};
    $scope.profile_doc.src = "";
	$scope.init = function(csrf_token, user_id) {
		$scope.csrf_token = csrf_token;
        $scope.user_id = user_id;
        get_industries($scope);
    	   get_countries($scope);

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

        } 
        if (user_id) {
            $scope.user_already_exists = true;
            $http.get('/profile/details/'+$scope.user_id+'/').success(function(data)
            {
                $scope.recruiter = data.recruiter[0]; 
                $('#last_date').val($scope.recruiter.last_date);
                $('#post_date').val($scope.recruiter.post_date);
                
            }).error(function(data, status)
            {
                console.log(data || "Request failed");
            });
        }
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
        } else if ($scope.recruiter.mobile == '' || $scope.recruiter.mobile == undefined || !Number($scope.recruiter.mobile) || $scope.recruiter.mobile.length != 10) {
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a Valid Mobile Number';
            return false;        
        } else if ($scope.recruiter.phone!='' && !Number($scope.recruiter.phone)) {
              $scope.error_flag = true;
              $scope.error_message = 'Please enter a Valid Land no.';
              return false;            
        } else if ($scope.recruiter.country == '' || $scope.recruiter.country == undefined) {
            $scope.error_flag = true;
            $scope.error_message = 'Please choose the Country';
            return false;
        } else if ($scope.profile_doc.src == '' || $scope.profile_doc.src == undefined)  {
            $scope.error_message = 'Please upload  your profile  ';
            return false;
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
            
             params = {
                'recruiter_details':angular.toJson($scope.recruiter),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('profile_doc', $scope.profile_doc.src);
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
                                                                
            }).error(function(data, status){
                $scope.error_flag = true;
                $scope.error_message = data.message;
                return false;
            });
        }
    }
}
function EditRecruiterController($scope, $element, $http, $timeout) {
  $scope.profile_doc = {};
  $scope.profile_doc.src = "";
  $scope.employer_id = 0;
  $scope.view_employer_details = true;
  $scope.init = function(csrf_token, employer_id) {
    $scope.csrf_token = csrf_token;
    $scope.employer_id = employer_id;
    get_industries($scope);
    get_countries($scope);
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
            'company_profile':''

        } 
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
        }  else if ($scope.recruiter.mobile == '' || $scope.recruiter.mobile == undefined || $scope.recruiter.mobile.match(letters)) {
            $scope.error_flag = true;
            $scope.error_message = 'Please provide a Valid Mobile Number';
            return false;        
        } else if ($scope.recruiter.phone != '' || $scope.recruiter.phone != undefined) {
            if ($scope.recruiter.phone.match(letters)) {
              $scope.error_flag = true;
              $scope.error_message = 'Please enter a Valid Land no.';
              return false;
        }
        }else if ($scope.profile_doc.src == '' || $scope.profile_doc.src == undefined)  {
            $scope.employer_validation_message = 'Please upload  your profile  ';
            return false;
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
            var url = '/employer/save_recruiter_details/';
            params = {
                'recruiter_details':angular.toJson($scope.recruiter),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('profile_doc', $scope.profile_doc.src);
            for(var key in params){
                fd.append(key, params[key]);          
            }
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined
                }
            }).success(function(data, status){
                
                document.location.href = '/employer/employer_profile/?id='+data.recruiter_id;;
                
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
        'function': '-select-',
        'requirement': '-select-',
        'specialisation': '',
        'nationality': '',
        'last_date': '',
        'post_date': '',
        'name': '',
        'phone': '',
        'email': '',
        'profile': '',
        'min':'-min-',
        'max':'-max-',
    }

	$scope.init = function(csrf_token,id) {
		$scope.csrf_token = csrf_token;
		$scope.product_pdf = {};
    $scope.product_pdf.src = "";
		get_countries($scope);
		get_nationalities($scope);
		get_industries($scope);
		get_functions($scope);
		get_education_required($scope);
    get_req_education_specialization($scope);
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
    $http.get('/employer/post_job/').success(function(data)
    {
        // $scope.companies = data.companies;
    }).error(function(data, status)
    {
        console.log(data || "Request failed");
    });

    if ($scope.job_id){
      $http.get('/employer/details/'+$scope.job_id+'/').success(function(data)
            {
                $scope.jobpost = data.jobpost[0]; 
                $('#last_dob').val($scope.jobpost.last_date);
                $('#post_dob').val($scope.jobpost.post_date);
            }).error(function(data, status)
            {
                console.log(data || "Request failed");
            });
    }		
  }

  $scope.get_req_stream = function(){
    var req_edu = $scope.jobpost.requirement;
    $scope.specializations = $scope.req_education_specialization[req_edu];
  }

  $scope.form_validation_postjob = function(){
    var letters = /^[A-Za-z]+$/;  
    $scope.jobpost.last_date = $('#last_dob').val();
    $scope.jobpost.post_date = $('#post_dob').val();
    if ($scope.jobpost.company == '' || $scope.jobpost.company == undefined) {
      $scope.jobpost.company = $('#company_name').val();
    }
    
    if ($scope.jobpost.title == ''|| $scope.jobpost.title == undefined){
      $scope.error_flag = true;
      $scope.error_message = 'Please provide a Job Title';
      return false;
    } else if ($scope.jobpost.code == '' || $scope.jobpost.code == undefined) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide Reference Code';
      return false;
    } else if ($scope.jobpost.company == '' || $scope.jobpost.company == undefined) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide Company Name';
      return false; 
    }  else if ($scope.jobpost.summary == '' || $scope.jobpost.summary == undefined) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide Job summary';
      return false;
    } else if (($scope.jobpost.salary != null || $scope.jobpost.salary != '' || $scope.jobpost.salary != undefined) && $scope.jobpost.salary != Number($scope.jobpost.salary)){
      $scope.error_flag = true;
      $scope.error_message = 'Please enter a Valid Amount for Salary';
      return false;
    }  else if ($scope.jobpost.salary != '' && ($scope.jobpost.currency == '' || $scope.jobpost.currency == undefined)) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Currency';
      return false;
    } else if ($scope.jobpost.skills == '' || $scope.jobpost.skills == undefined) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Required Skills';
      return false;
    } else if ($scope.jobpost.min != 0 ) {
      if($scope.jobpost.min == '' || $scope.jobpost.min == undefined || $scope.jobpost.min == '-min-'){
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the minimum Experience Required';
        return false;
      }
    } else if ($scope.jobpost.max != 0 ) {
      if($scope.jobpost.max == '' || $scope.jobpost.max == undefined || $scope.jobpost.max == '-min-'){
        $scope.error_flag = true;
        $scope.error_message = 'Please provide the maximum Experience Required';
        return false;
      }
    } else if ($scope.jobpost.location == '' || $scope.jobpost.location == undefined || $scope.jobpost.location == '-select-') {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Job location';
      return false;
    } else if ($scope.jobpost.industry == '' || $scope.jobpost.industry == undefined || $scope.jobpost.industry == '-select-') {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Industry';
      return false;
    } else if ($scope.jobpost.function == '' || $scope.jobpost.function == undefined || $scope.jobpost.function == '-select-') {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Category/Function';
      return false;
    } else if ($scope.jobpost.requirement == '' || $scope.jobpost.requirement == undefined || $scope.jobpost.requirement == '-select-') {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Education Required';
      return false;
    } else if ($scope.jobpost.nationality == '' || $scope.jobpost.nationality == undefined || $scope.jobpost.nationality == '-select-') {
      $scope.error_flag = true;
      $scope.error_message = 'Please select your Nationality';
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
    } else if ($scope.jobpost.profile == '' || $scope.jobpost.profile == undefined) {
      $scope.error_flag = true;
      $scope.error_message = 'Please provide the Company Profile';
      return false;
    } return true;
    }
    $scope.save_job = function(){
        $scope.jobpost.last_date = $('#last_dob').val();
        $scope.jobpost.post_date = $('#post_dob').val();
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
            var file = $scope.product_pdf.src;
            var edit = $scope.edit;
            params = {
                'jobpost':angular.toJson($scope.jobpost),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            var fd = new FormData();
            fd.append('product_pdf', $scope.product_pdf.src);
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
    $scope.experiences = [];
    $scope.alert_style = {};
    $scope.search = {
        'keyword' : '',
        'location' : '',
        'experience' : '',
        'function_name' : '',
        'industry' : '',
    }
    $scope.init = function(csrf_token, search_location, search_keyword, search_experience, search_function_name, search_industry) {
        $scope.csrf_token = csrf_token;
        get_functions($scope);
        get_industries($scope);

        if(search_location != '' || search_location != undefined){
          $scope.search.location = search_location;
        }
        if (search_keyword != '' || search_keyword != undefined) {
          $scope.search.keyword = search_keyword;
        }
        if (search_experience != '' || search_experience != undefined) {
          $scope.search.experience = search_experience;
        }
        if (search_function_name != '' || search_function_name != undefined) {
          $scope.search.function_name = search_function_name;
        }
        if (search_industry != '' || search_industry != undefined) {
          $scope.search.industry = search_industry;
        }

        for(var i=0; i<=50; i++){
            $scope.experiences.push(i);
        }
    }
    $scope.search = function(search_type){
        search_job($scope, search_type);
    } 

    $scope.search_cv = function() {
        if (($scope.resume_title == '' || $scope.resume_title == undefined) && ($scope.age == '' || $scope.age == undefined) && ($scope.keyword == '' || $scope.keyword == undefined)) {
                $scope.error_flag = true;
                $scope.error_message = 'Please enter value for the any of the criteria';
                $scope.alert_style = {border: '1px solid #FF0000'};
                
        }  else {
            $scope.alert_style = {};
            $scope.error_flag = false;
            $scope.error_message = '';
            var url = '/search_cv/?cv_title='+$scope.resume_title+'&age='+$scope.age+'&keyword='+$scope.keyword;
            document.location.href = url;
        }

    }
}
function CandidateSearchController($scope,$element,$http,$timeout){
  $scope.init = function(){
    get_industries($scope);
    get_functions($scope);
    get_basic_education($scope);
    get_basic_education_specialization($scope);
    $scope.experience = [];
    $scope.candidates_data_table = false;
    for(var i=0; i<=50; i++)
      $scope.experience.push(i);   
    }
    $scope.get_stream = function() {
        get_stream($scope);
    }
    $scope.validate_search_candidates = function(){
      if($scope.educational_details == undefined || $scope.educational_details.basic_edu == "" || $scope.educational_details.basic_edu == undefined){
        $scope.error_message = "Please select the educational qualification required";
        return false;
      }
      if($scope.educational_details.basic_specialization == "" || $scope.educational_details.basic_specialization == undefined)
          $scope.educational_details.basic_specialization = "";
      if(!angular.isUndefined($scope.search_candidate)){
        if($scope.search_candidate.functions == "" || $scope.search_candidate.functions == undefined)
          $scope.search_candidate.functions = "";
        if($scope.search_candidate.industry == "" || $scope.search_candidate.industry == undefined)
          $scope.search_candidate.industry = "";
        if($scope.search_candidate.months == "" || $scope.search_candidate.months == undefined)
          $scope.search_candidate.months = "";
        if($scope.search_candidate.skills == "" || $scope.search_candidate.skills == undefined)
          $scope.search_candidate.skills = "";
        if($scope.search_candidate.years == "" || $scope.search_candidate.years == undefined)
          $scope.search_candidate.years = "";
      }  
      else{
          $scope.search_candidate = {
            'functions': '',
            'industry': '',
            'months': '',
            'years': '',
            'skills': '',
          }
      }  
      return true;       
       
    }
    $scope.search_candidates = function(){
      if ($scope.validate_search_candidates()) {
        $scope.error_message = '';
        var url = '/employer/search_candidates/?functions='+$scope.search_candidate.functions+'&industry='+$scope.search_candidate.industry+'&months='+$scope.search_candidate.months+'&years='+$scope.search_candidate.years+'&skills='+$scope.search_candidate.skills+'&basic_edu='+$scope.educational_details.basic_edu+'&basic_specialization='+$scope.educational_details.basic_specialization;
        $http.get(url).success(function(data) {
            $scope.candidates_data = data.candidates_data;
            console.log($scope.candidates_data);
            if($scope.candidates_data.length > 0)
              $scope.candidates_data_table = true;
        })
      }
    }
}