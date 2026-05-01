"use client";
import React from "react";
import { useMemo, useState } from "react";
import DropdownSelect from "../common/DropdownSelect";

const MONTH_OPTIONS = [60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1200];
const MONTH_OPTION_LABELS = MONTH_OPTIONS.map((m) => `${m} months`);

const toNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export default function LoanCalculator({ price = 0, showTitle = true }) {
  const initialAmount = toNum(price, 0);
  const [amount, setAmount] = useState(initialAmount);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [months, setMonths] = useState(240);

  const result = useMemo(() => {
    const principalTotal = Math.max(toNum(amount, 0), 0);
    const downPercent = Math.min(Math.max(toNum(downPaymentPercent, 0), 0), 100);
    const downPayment = (principalTotal * downPercent) / 100;
    const loanPrincipal = Math.max(principalTotal - downPayment, 0);
    const n = Math.max(toNum(months, 0), 1);
    const monthlyRate = Math.max(toNum(interestRate, 0), 0) / 12 / 100;

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let monthlyPayment = 0;
    if (loanPrincipal > 0) {
      if (monthlyRate === 0) {
        monthlyPayment = loanPrincipal / n;
      } else {
        const pow = Math.pow(1 + monthlyRate, n);
        monthlyPayment = (loanPrincipal * monthlyRate * pow) / (pow - 1);
      }
    }

    return {
      downPayment,
      monthlyPayment,
    };
  }, [amount, downPaymentPercent, interestRate, months]);

  return (
    <>
      {showTitle && (
        <div className="wg-title text-11 fw-6 text-color-heading">
          Loan Calculator
        </div>
      )}
      <form className="form-pre-approved" onSubmit={(e) => e.preventDefault()}>
        <div className="cols">
          <fieldset>
            <label className="text-1 fw-6 mb-12" htmlFor="amount">
              Total Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min={0}
            />
          </fieldset>
          <div className="wrap-input">
            <fieldset className="payment">
              <label className="text-1 fw-6 mb-12" htmlFor="payment">
                Down Payment
              </label>
              <input
                type="number"
                id="payment"
                value={result.downPayment.toFixed(0)}
                readOnly
              />
            </fieldset>
            <fieldset className="percent">
              <input
                className="input-percent"
                type="text"
                value={`${downPaymentPercent}%`}
                onChange={(e) => {
                  const cleaned = String(e.target.value).replace("%", "");
                  setDownPaymentPercent(cleaned);
                }}
              />
            </fieldset>
          </div>
        </div>
        <div className="cols">
          <fieldset className="interest-rate">
            <label className="text-1 fw-6 mb-12" htmlFor="interest-rate">
              Interest Rate
            </label>
            <input
              type="number"
              id="interest-rate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min={0}
              step="0.1"
            />
          </fieldset>
          <div className="select">
            <label className="text-1 fw-6 mb-12">
              Amortization Period (months)
            </label>
            <DropdownSelect
              options={MONTH_OPTION_LABELS}
              selectedValue={`${months} months`}
              onChange={(label) => {
                const match = String(label).match(/\d+/);
                const m = match ? Number(match[0]) : NaN;
                if (Number.isFinite(m) && m > 0) {
                  setMonths(m);
                }
              }}
            />
          </div>
        </div>
        <div className="wrap-btn flex items-center justify-between">
          <button type="button" className="tf-btn bg-color-primary pd-22 fw-7">
            Calculate now <i className="icon-arrow-right-2 fw-4" />
          </button>
          <p className="text-1 mb-0 fw-5 text-color-heading">
            Your estimated monthly payment:
            <span> ₹{result.monthlyPayment.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          </p>
        </div>
      </form>
    </>
  );
}
