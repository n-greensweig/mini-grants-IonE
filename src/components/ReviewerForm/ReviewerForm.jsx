//Imports
import React, { useState } from 'react';
import './ReviewerForm.css';


function ReviewerForm(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'NONE', 
        grantsToReview: 0,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    function handleSubmit (event) {
        event.preventDefault();

        console.log('Form Data', formData);
    }

    //multi select drop down
    const options = ["Accounting", "Finance", "Information & Decision Sciences", "Marketing", 
    "Strategic Management & Entrepreneurship", "Supply Chain & Operations", "Work & Organizations", 
    "Analytics for Good Institute", "Business Advancement Center for Health", "Carlson Global Institute", 
    "Center for Human Resources & Labor Studies", "Center for Integrative Leadership", 
    "Gary S. Holmes Center for Entrepreneurship", "Institute for Research in Marketing", 
    "Juran Research Center", "Management Information Systems Research Center", 
    "Medical Industry Leadership Institute", "Medical Valuation Laboratory", "Biochemistry, Molecular Biology & Biophysics", 
    "Biology Teaching & Learning", "Cedar Creek Ecosystem Science Reserve", 
    "Conservatory & Botanical Collection", "Dean's Office", "Ecology, Evolution & Behavior", 
    "Genetics, Cell Biology & Development", "Itasca Biological Station & Laboratories", 
    "Microbiology & Immunology", "Plant & Microbial Biology", "Student Services", "Advancement", 
    "Alumni Relations", "Graphic Design, Apparel Design, Retail Merch&ising & Product Design", 
    "Architecture, L&scape Architecture & Interior Design", "Center for Sustainable Building Research", 
    "Communications", "Development", "Digital Design Center", "Fabrication Shops", "Finance", 
    "Goldstein Museum of Design", "Human Dimensioning Lab", "Human Resources", "Information Technology", 
    "Minnesota Design Center", "Office of the Dean", "Student Services", "Wearable Technology Lab", 
    "Department of Curriculum & Instruction", "Department of Educational Psychology", 
    "Department of Family Social Science", "Institute of Child Development", "School of Kinesiology", 
    "Department of Organizational Leadership, Policy, & Development", "School of Social Work", 
    "Career Services", "Student Services", "Teacher Education", "Academic & Information Technology Services", 
    "Communications & Marketing", "Educational Technology Innovations", "Events", "External Relations", 
    "Facilities & Space Planning", "Financial Services", "Graduate Education & Faculty Development", 
    "Human Resources", "International Initiatives", "Office of Research & Policy", 
    "Professional & Online Education", "TRIO", "Undergraduate Education", 
    "Agricultural Education, Communication & Marketing", "Agronomy & Plant Genetics", "Applied Economics", 
    "Animal Science", "Bioproducts & Biosystems Engineering", "Entomology", "Fisheries, Wildlife & Conservation Biology", 
    "Food Science & Nutrition", "Forest Resources", "Horticultural Science", "Plant Pathology", 
    "Soil, Water & Climate", "African American & African Studies", "American Indian Studies", "American Studies", 
    "Anthropology", "Art", "Art History", "Asian & Middle Eastern Studies", "Chicano & Latino Studies", 
    "Classical & Near Eastern Religions & Cultures", "Communication Studies", "Cultural Studies & Comparative Literature", 
    "Economics", "English", "French & Italian", "Gender, Women & Sexuality Studies", "Geography, Environment & Society", 
    "German, Nordic, Slavic & Dutch", "Global Studies", "History", "Journalism & Mass Communication, Hubbard School of", 
    "Linguistics", "Music", "Philosophy", "Political Science", "Psychology", "Sociology", "Spanish & Portuguese Studies", 
    "Speech-Language-Hearing Sciences", "Statistics", "Theatre Arts & Dance", "Writing Studies", 
    "Center for Applied & Translational Sensory Science", "Center for Austrian Studies", "Center for German & European Studies", 
    "Center for Holocaust & Genocide Studies", "Center for Jewish Studies", "Center for Premodern Studies", 
    "Center for Race, Indigeneity, Disability, Gender & Sexuality Studies", "Immigration History Research Center", 
    "Minnesota Center for Philosophy of Science", "African Studies Initiative", "Center for Early Modern History", 
    "Center for the Study of Political Psychology", "Center for Writing", "Consortium for the Study of the Premodern World", 
    "Data Science Initiative", "Julia M. Davis Center", "Environmental Humanities Initiative", "Heller-Hurwicz Economics Institute", 
    "Interdisciplinary Collaborative Workshop", "Middle East Collaborative", "Minnesota Journalism Center", 
    "Silha Center for the Study of Media Ethics & Law", "Department of Aerospace Engineering & Mechanics", 
    "Department of Biomedical Engineering", "Department of Chemical Engineering & Materials Science", 
    "Department of Chemistry", "Department of Civil, Environmental, & Geo- Engineering", 
    "Department of Computer Science & Engineering", "Department of Earth & Environmental Sciences", 
    "Department of Electrical & Computer Engineering", "Department of Industrial & Systems Engineering", 
    "School of Mathematics", "Department of Mechanical Engineering", "School of Physics & Astronomy", 
    "BioTechnology Institute (BTI)", "Center for Spintronic Materials, Interfaces, & Novel Architectures (C-SPIN)", 
    "Center for Sustainable Polymers (CSP)", "Characterization Facility (CharFac)", "Charles Babbage Institute of Computer History (CBI)", 
    "Industrial Partnership for Research in Interfacial & Materials Engineering (IPrime)", "Inorganometallic Catalyst Design Center (ICDC)", 
    "Institute for Engineering in Medicine (IEM)", "Institute for Mathematics & its Applications (IMA)", "Medical Devices Center (MDC)", 
    "Minnesota Geological Survey (MGS)", "Minnesota Nano Center (MNC)", "Nanoporous Materials Genome Center (NMGC)", 
    "NSF Engineering Research Center for Compact & Efficient Fluid Power (CCEFP)", "NSF Materials Research Science & Engineering Center (MRSEC)",
     "NSF Multi-Axial Subassemblage Testing (MAST) Lab", "St. Anthony Falls Laboratory (SAFL)", 
     "School of Mathematics Center for Educational Programs—K-12 (MathCEP)", "UNITE Distributed Learning", 
     "Center for Transportation Studies (CTS)", "Institute on the Environment (IonE)", "Minnesota Supercomputing Institute (MSI)", 
     "Anesthesiology", "Biochemistry, Molecular Biology & Biophysics", "Dermatology", "Emergency Medicine", 
     "Family Medicine & Community Health", "Genetics, Cell Biology & Development", "Integrative Biology & Physiology", 
     "Laboratory Medicine & Pathology", "Medicine", "Microbiology & Immunology", "Neurology", "Neuroscience", "Neurosurgery", 
     "Obstetrics, Gynecology & Women's Health", "Ophthalmology & Visual Neurosciences", "Orthopedic Surgery", 
     "Otolaryngology (ENT)", "Pediatrics", "Pharmacology", "Psychiatry & Behavioral Sciences", "Radiation Oncology", 
     "Radiology", "Rehabilitation Medicine", "Surgery", "Urology", "Center for Clinical Quality & Outcomes Discovery & Evaluation (C-QODE)", 
     "Center for Genome Engineering (CGE)", "Center for Immunology (CFI)", "Center for Inflammation Science", 
     "Center for Learning Health System Sciences (CLHSS)", "Center for Magnetic Resonance Research (CMRR)", 
     "Center for Pediatric Obesity Medicine (CPOM)", "Center for the Art of Medicine", "Center for Women's Health Research", 
     "Center of American Indian & Minority Health", "Developmental Biology Center (DBC)", "Duluth Global Health Research Institute (DGHRI)", 
     "Institute for Diabetes, Obesity & Metabolism (IDOM)", "Institute for Engineering in Medicine (IEM)", "Institute for Sexual & Gender Health", 
     "Institute for Translational Neuroscience (ITN)", "Lillehei Heart Institute (LHI)", "Paul & Sheila Wellstone Muscular Dystrophy Center", 
     "Program in Health Disparities Research (PHDR)", "Stem Cell Institute (SCI)", "Translational Center for Resuscitative Trauma Care", 
     "UM Institute on Infectious Diseases (UMIID)", "Department of Experimental & Clinical Pharmacology", "Department of Medicinal Chemistry", 
     "Department of Pharmaceutical Care & Health Systems", "Department of Pharmaceutics", "Department of Pharmacy Practice & Pharmaceutical Sciences",
      "Medical Laboratory Sciences", "Occupational Therapy", "Clinical Affairs Division", "Professional Education Division", 
      "Epidemiology & Community Health", "Health Policy & Management", "Environmental Health Sciences", "Biostatistics & Health Data Science", 
      "Communications", "Diversity, Equity & Inclusion", "Faculty Affairs", "Human Resources", "Development & Alumni Relations",
       "E-Learning Services", "Finances", "Student Services", "Rothenberger Institute", "Summer Public Health Institute", 
       "Bakken Center for Spirituality & Healing", "Adult & Gerontological Health Cooperative", "Child & Family Health Cooperative",
       "Population Health & Systems Cooperative", "Global Health", "Professional Development", "Diversity, Equity & Inclusion",
        "Center for Health Interprofessional Programs", "Center for Interprofessional Health", "M Simulation", 
        "National Center for Interprofessional Practice & Education", "Office of Academic Clinical Affairs",
        "Office of the Associate Vice President for Academic Health Sciences", "Pre-Health Student Resource Center", 
        "Department of Developmental & Surgical Sciences", "Department of Diagnostic & Biological Sciences", "Department of Primary Dental Care",
        "Department of Restorative Sciences", "Center for Science, Technology, and Environmental Policy", 
        "Institute for Urban and Regional Infrastructure Finance", "Center on Women, Gender, and Public Policy",
        "Center for the Study of Politics and Governance", "Center for Integrative Leadership", 
        "Roy Wilkins Center for Human Relations and Social Justice", "Financial Services", "Human Resources", "Academic Programs", 
         "Career and Student Success", "Office of the Dean", "Office of Advancement", "Admissions", 
         "Strategic Communications, Events, and Technology", "International Fellows and Scholars Program", "Facilities", 
         "Veterinary & Biomedical Sciences", "Veterinary Clinical Sciences", "Veterinary Population Medicine", 
        "Veterinary Diagnostic Laboratory", "Veterinary Medical Center", "Center for Animal Health & Food Safety", 
        "Clinical Investigation Center", "John Fetrow Dairy Education Center", "Leatherdale Equine Center", "Minnesota Urolith Center", 
        "The Raptor Center", "Swine Program" ];
    
    
    
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;

    if (!selectedItems.includes(selectedValue)) {
      setSelectedItems([...selectedItems, selectedValue]);
    } else {
      // If the item is already selected, remove it from the list
      setSelectedItems(selectedItems.filter(item => item !== selectedValue));
    }
  };


    return (
        <>
        <div id='Reviewer-Card'>

        <h2>Please submit some information about you! </h2>

            <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder='Prince Nelson'
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
        
            <div>
                <label>Email Address:</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder='PriceNelson@umn.edu'
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
        {/* Department Affiliations */}
        <div>
                <label htmlFor="multiSelect">Select any department affiliations:</label>
                <select
                    id="multiSelect"
                    multiple
                    onChange={handleSelectionChange}
                    value={selectedItems}
                >
                    {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            <div>
                <p>Selected Departments: {selectedItems.join(', ')}</p>
            </div>
        </div>
        
            <div>
                <label>Grants to Review:</label>
                <input
                type="number"
                id="grantsToReview"
                name="grantsToReview"
                value={formData.grantsToReview}
                onChange={handleChange}
                required
                />
            </div>
        
            <button type="submit">Submit</button>
            </form>
        </div>
        </>
      );
}

export default ReviewerForm;