import React from 'react'

export default function Summary({ proteinGrams,fatGrams,carbsGrams,bmr }) {
    return (
        <div className="row">

            <div className="col-sm-12">
                <h2>Summary</h2>
                <hr />
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
                    <div>Carbs - {Math.round(carbsGrams)}gr - {Math.round(carbsGrams * 4)} cal</div><br />
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
    )
}
