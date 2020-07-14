import React, {useState,useEffect} from 'react';
import NumberInput from './NumberInput';
import RadioInput from './RadioInput';

function App() {
   const [sex, setSex] = useState()
   const [weight, setWeight] = useState(80)
   const [height, setHeight] = useState(170)
   const [age, setAge] = useState(28)
   const [bodyFatPercentage, setBodyFatPercentage] = useState(0)
   const [activityMultiplier, setActivityMultiplier] = useState(1.2)
   const [proteinIntakeRatio, setProteinIntakeRatio] = useState(1.4)
   const [fatIntakePercentage, setFatIntakePercentage] = useState(27)
   const [bmr, setBmr] = useState(0)
   const [proteinGrams, setProteinGrams] = useState(0)
   const [fatGrams, setFatGrams] = useState(0)
   const [carbsGrams, setCarbsGrams] = useState(0)


   useEffect(() => {
      // Mifflin St. Jeor - determining BMR
      // BMR (MALE) = 10 X WEIGHT(KG) + 6.25 X HEIGHT(CM) - 5 X AGE(Y) + 5
      // BMR (FEMALE) = 10 X WEIGHT(KG) + 6.25 X HEIGHT(CM) - 5 X AGE(Y) - 161
      if (!sex || weight === 0 || height === 0 || age === 0) return;

      const bmr = (10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : - 161)) * activityMultiplier;

      setBmr(bmr)

   }, [sex, weight, height, age, activityMultiplier])

   useEffect(() => {
      if (bodyFatPercentage === 0) return;

      const pounds = weight * 2.205;
         
      const leanBodyMass = pounds - (pounds * (bodyFatPercentage / 100))

      const proteinGr = leanBodyMass * proteinIntakeRatio;
      const fatGr = ((fatIntakePercentage / 100) * bmr) / 9;
      const carbsGr = (bmr - ((proteinGr * 4) + (fatGr * 9))) / 4;

      setProteinGrams(proteinGr)
      setFatGrams(fatGr)
      setCarbsGrams(carbsGr)


   }, [bmr, bodyFatPercentage, weight, proteinIntakeRatio, fatIntakePercentage])
   

   return (
      <div className="container">
         <div className="row">
            <div className="col-sm-12">
               <h1>Macros Calculator</h1>
               <hr />
               <div className="form">

                  <div className="form-group">
                     <label className="radio-inline">
                        <RadioInput name="sex" value="male" changed={(e) => setSex(e.target.value) }/> Male
                     </label>
                     <label className="radio-inline">
                        <RadioInput name="sex" value="female" changed={(e) => setSex(e.target.value) }/> Female
                     </label>
                  </div>

                  <div className="row">
                     <div className="col-sm-6">
                        <div className="form-group">
                           <label>Weight (lbs/Kg)</label>
                           <NumberInput changed={(e) => setWeight(e.target.value)} value={weight}/>
                        </div>
                        <div className="form-group">
                           <label>Height (cm/ft)</label>
                           <NumberInput changed={(e) => setHeight(e.target.value)} value={height}/>
                        </div>
                        <div className="form-group">
                           <label>Age</label>
                           <NumberInput changed={(e) => setAge(e.target.value)} value={age} />
                        </div>
                        <div className="form-group">
                           <label>Activity Multiplier</label>
                           <NumberInput 
                              changed={(e) => setActivityMultiplier(e.target.value)} 
                              value={activityMultiplier} 
                              step={0.1} 
                              min={1.2}
                              max={2.2}
                           />
                        </div>

                        <div className="form-group">
                           <label>BMR</label>
                           <NumberInput changed={(e) => setBmr(e.target.value)} value={Math.round(bmr)} />
                        </div>
                     </div>

                     <div className="col-sm-6">

                        <div className="form-group">
                           <label>Body Fat %</label>
                           <NumberInput changed={(e) => setBodyFatPercentage(e.target.value)} value={bodyFatPercentage} />
                        </div>

                        <div className="form-group">
                           <label>Protein Ratio</label>
                           <NumberInput
                              changed={(e) => setProteinIntakeRatio(e.target.value)}
                              value={proteinIntakeRatio}
                              step={0.1}
                              min={1.2}
                              max={1.6}
                           />
                        </div>

                        <div className="form-group">
                           <label>Fat Intake Percentage</label>
                           <NumberInput
                              changed={(e) => setFatIntakePercentage(e.target.value)}
                              value={fatIntakePercentage}
                              min={10}
                              max={50}
                           />
                        </div>

                     </div>
                  </div>



               </div>

               <h2>Summary</h2>
               <div>Protein - {Math.round(proteinGrams)}gr - {Math.round(proteinGrams*4)} cal</div>
               <div>Fat - {Math.round(fatGrams)}gr - {Math.round(fatGrams*9)} cal</div>
               <div>Carbs - {Math.round(carbsGrams)}gr - {Math.round(carbsGrams*4)} cal</div>

               <div className="progress">
                  <div className="progress-bar progress-bar-primary" style={{ width: `${((proteinGrams * 4) / bmr) * 100}%`}}>
                     <span className="sr-only">35% Complete (primary)</span>
                     {`${Math.round(((proteinGrams * 4) / bmr) * 100)}%`}
                  </div>
                  <div className="progress-bar progress-bar-success" style={{ width: `${((fatGrams * 9) / bmr) * 100}%`}}>
                     <span className="sr-only">20% Complete (success)</span>
                     {`${Math.round(((fatGrams * 9) / bmr) * 100)}%`}
                  </div>
                  <div className="progress-bar progress-bar-warning" style={{ width: `${((carbsGrams * 4) / bmr) * 100}%`}}>
                     <span className="sr-only">10% Complete (warning)</span>
                     {`${Math.round(((carbsGrams * 4) / bmr) * 100)}%`}
                  </div>
               </div>


            </div>
         </div>
      </div>
   );
}

export default App;
