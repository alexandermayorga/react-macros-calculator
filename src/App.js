import React, {useState,useEffect} from 'react';
import NumberInput from './NumberInput';
import RadioInput from './RadioInput';

function App() {
   const [sex, setSex] = useState()
   const [weight, setWeight] = useState(174)
   const [height, setHeight] = useState(5.85)
   const [age, setAge] = useState(31)
   const [unit, setUnit] = useState('imperial')
   const [bodyFatPercentage, setBodyFatPercentage] = useState(19)
   const [activityMultiplier, setActivityMultiplier] = useState(1.4)
   const [proteinIntakeRatio, setProteinIntakeRatio] = useState(1.4)
   const [fatIntakePercentage, setFatIntakePercentage] = useState(27)
   const [bmr, setBmr] = useState(0)
   const [proteinGrams, setProteinGrams] = useState(0)
   const [fatGrams, setFatGrams] = useState(0)
   const [carbsGrams, setCarbsGrams] = useState(0)



   useEffect(() => {
      // const data = { sex, weight, height, age, unit, bodyFatPercentage, activityMultiplier, proteinIntakeRatio, fatIntakePercentage, bmr, proteinGrams, fatGrams, carbsGrams }
      // const dataJSON = JSON.stringify(data)
      // localStorage.setItem('userData', dataJSON);
      const userData = localStorage.getItem('userData')
      if (userData) {
         const data = JSON.parse(userData);
         
         setSex(data.sex);
         setWeight(data.weight);
         setHeight(data.height);
         setAge(data.age);
         setUnit(data.unit);
         setBodyFatPercentage(data.bodyFatPercentage);
         setActivityMultiplier(data.activityMultiplier);
         setProteinIntakeRatio(data.proteinIntakeRatio);
         setFatIntakePercentage(data.fatIntakePercentage);
         setBmr(data.bmr);
         setProteinGrams(data.proteinGrams);
         setFatGrams(data.fatGrams);
         setCarbsGrams(data.carbsGrams);

      }
   }, [])

   useEffect(() => {
      const data = {sex,weight,height,age,unit,bodyFatPercentage,activityMultiplier,proteinIntakeRatio,fatIntakePercentage,bmr,proteinGrams,fatGrams,carbsGrams}
      localStorage.setItem('userData', JSON.stringify(data));
   }, [sex, weight, height, age, unit, bodyFatPercentage, activityMultiplier, proteinIntakeRatio, fatIntakePercentage, bmr, proteinGrams, fatGrams, carbsGrams])


   useEffect(() => {
      // Mifflin St. Jeor - determining BMR
      // BMR (MALE) = 10 X WEIGHT(KG) + 6.25 X HEIGHT(CM) - 5 X AGE(Y) + 5
      // BMR (FEMALE) = 10 X WEIGHT(KG) + 6.25 X HEIGHT(CM) - 5 X AGE(Y) - 161
      if (!sex || weight === 0 || height === 0 || age === 0) return;

      const weightInUnit = (unit === "imperial" ? weight / 2.205 : weight)
      const heightInUnit = (unit === "imperial" ? height * 30.48 : height)

      const bmr = (10 * weightInUnit + 6.25 * heightInUnit - 5 * age + (sex === "male" ? 5 : - 161)) * activityMultiplier;



      setBmr(bmr)

   }, [sex, weight, height, age, activityMultiplier, unit])

   useEffect(() => {
      if (bodyFatPercentage === 0) return;

      const weightInLbs = (unit === "imperial" ? weight : weight * 2.205)
         
      const leanBodyMass = weightInLbs - (weightInLbs * (bodyFatPercentage / 100))

      const proteinGr = leanBodyMass * proteinIntakeRatio;
      const fatGr = ((fatIntakePercentage / 100) * bmr) / 9;
      const carbsGr = (bmr - ((proteinGr * 4) + (fatGr * 9))) / 4;

      setProteinGrams(proteinGr)
      setFatGrams(fatGr)
      setCarbsGrams(carbsGr)


   }, [bmr, bodyFatPercentage, weight, proteinIntakeRatio, fatIntakePercentage, unit])
   

   return (
      <div className="container">
         <div className="row">
            <div className="col-sm-12">

               <h1>Macros Calculator</h1>
               <hr />
               <div className="form">

                  <div className="form-group">
                     <label>Sex</label> <br/>
                     <label className="radio-inline">
                        <RadioInput name="sex" value="male" changed={(e) => setSex(e.target.value)} checked={sex}/> Male
                     </label>
                     <label className="radio-inline">
                        <RadioInput name="sex" value="female" changed={(e) => setSex(e.target.value)} checked={sex}/> Female
                     </label>
                  </div>

                  <div className="form-group">
                     <label>Unit System</label> <br />
                     <label className="radio-inline">
                        <RadioInput name="unit" value="imperial" changed={(e) => setUnit(e.target.value)} checked={unit}/> Imperial
                     </label>
                     <label className="radio-inline">
                        <RadioInput name="unit" value="metric" changed={(e) => setUnit(e.target.value)} checked={unit}/> Metric
                     </label>
                  </div>

                  <div className="row">
                     <div className="col-sm-6">

                        <div className="row">

                           <div className="col-sm-6 col-md-4">
                              <div className="form-group">
                                 <label>Weight {unit === "imperial" ? "(lbs)" : "(Kg)"}</label>
                                 <NumberInput changed={(e) => setWeight(e.target.value)} value={weight} />
                              </div>
                           </div>

                           <div className="col-sm-6 col-md-4">
                              <div className="form-group">
                                 <label>Height {unit === "imperial" ? "(ft)" : "(cm)"}</label>
                                 <NumberInput changed={(e) => setHeight(e.target.value)} value={height} />
                              </div>
                           </div>

                           <div className="col-sm-12 col-md-4">
                              <div className="form-group">
                                 <label>Age</label>
                                 <NumberInput changed={(e) => setAge(e.target.value)} value={age} />
                              </div>
                           </div>

                        </div>
                        <div className="form-group">
                           <label>Activity Multiplier <small> ( range: 1.2 to 2.2 )</small></label>
                           <NumberInput 
                              changed={(e) => setActivityMultiplier(e.target.value)} 
                              value={activityMultiplier} 
                              step={0.1} 
                              min={1.2}
                              max={2.2}
                           />
                           <span className="help-block">
                              Sedentary to Highly Active LifeStyle
                           </span>
                        </div>

                        <div className="form-group">
                           <label>BMR (Maintenance Calories)</label>
                           <NumberInput changed={(e) => setBmr(e.target.value)} value={Math.round(bmr)} />
                           <span className="help-block">
                              Based on Mifflin St. Jeor
                           </span>
                        </div>
                     </div>

                     <div className="col-sm-6">

                        <div className="form-group">
                           <label>Body Fat %</label>
                           <NumberInput changed={(e) => setBodyFatPercentage(e.target.value)} value={bodyFatPercentage} />
                        </div>

                        <div className="form-group">
                           <label>Protein Ratio <small>( range: 1.2 to 1.6 )</small></label>
                           <div className="small"></div>
                           <NumberInput
                              changed={(e) => setProteinIntakeRatio(e.target.value)}
                              value={proteinIntakeRatio}
                              step={0.1}
                              min={1.2}
                              max={1.6}
                           />
                           <span className="help-block">Closer to 1.6 the leaner you are</span>
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

               </div>{/* .form */}

            </div>
         </div>

         <div className="row">

            <div className="col-sm-12">
               <h2>Summary</h2>
               <hr/>
            </div>

            <div className="col-sm-4">
               <div className="text-center">
                  <div>Protein - {Math.round(proteinGrams)}gr - {Math.round(proteinGrams * 4)} cal</div>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="text-center">
                  <div>Fat - {Math.round(fatGrams)}gr - {Math.round(fatGrams * 9)} cal</div>
               </div>
            </div>
            <div className="col-sm-4">
               <div className="text-center">
                  <div>Carbs - {Math.round(carbsGrams)}gr - {Math.round(carbsGrams * 4)} cal</div><br/>
               </div>
            </div>

            <div className="col-sm-12">
               <div className="progress">
                  <div className="progress-bar progress-bar-primary" style={{ width: `${((proteinGrams * 4) / bmr) * 100}%` }}>
                     <span className="sr-only">35% Complete (primary)</span>
                     {`${Math.round(((proteinGrams * 4) / bmr) * 100)}%`}
                  </div>
                  <div className="progress-bar progress-bar-success" style={{ width: `${((fatGrams * 9) / bmr) * 100}%` }}>
                     <span className="sr-only">20% Complete (success)</span>
                     {`${Math.round(((fatGrams * 9) / bmr) * 100)}%`}
                  </div>
                  <div className="progress-bar progress-bar-warning" style={{ width: `${((carbsGrams * 4) / bmr) * 100}%` }}>
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
