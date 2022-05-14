import React from "react";
import "../styles/accordion.css";

const Accordion = () => {
  return (
    <div>
      <h1>This is accordion page</h1>
      <div id="accordionGroup" class="Accordion">
        <h3>
          <button
            aria-expanded="true"
            class="Accordion-trigger"
            aria-controls="sect1"
            id="accordion1id"
          >
            <span class="Accordion-title">
              Personal Information
              <span class="Accordion-icon"></span>
            </span>
          </button>
        </h3>
        <div
          id="sect1"
          role="region"
          aria-labelledby="accordion1id"
          class="Accordion-panel"
        >
          <div>
            <fieldset>
              <p>
                <label for="cufc1">
                  Name
                  <span aria-hidden="true">*</span>:
                </label>
                <input
                  type="text"
                  value=""
                  name="Name"
                  id="cufc1"
                  class="required"
                  aria-required="true"
                />
              </p>
              <p>
                <label for="cufc2">
                  Email
                  <span aria-hidden="true">*</span>:
                </label>
                <input
                  type="text"
                  value=""
                  name="Email"
                  id="cufc2"
                  aria-required="true"
                />
              </p>
              <p>
                <label for="cufc3">Phone:</label>
                <input type="text" value="" name="Phone" id="cufc3" />
              </p>
              <p>
                <label for="cufc4">Extension:</label>
                <input type="text" value="" name="Ext" id="cufc4" />
              </p>
              <p>
                <label for="cufc5">Country:</label>
                <input type="text" value="" name="Country" id="cufc5" />
              </p>
              <p>
                <label for="cufc6">City/Province:</label>
                <input type="text" value="" name="City_Province" id="cufc6" />
              </p>
            </fieldset>
          </div>
        </div>
        <h3>
          <button
            aria-expanded="false"
            class="Accordion-trigger"
            aria-controls="sect2"
            id="accordion2id"
          >
            <span class="Accordion-title">
              Billing Address
              <span class="Accordion-icon"></span>
            </span>
          </button>
        </h3>
        <div
          id="sect2"
          role="region"
          aria-labelledby="accordion2id"
          class="Accordion-panel"
          hidden=""
        >
          <div>
            <fieldset>
              <p>
                <label for="b-add1">Address 1:</label>
                <input type="text" name="b-add1" id="b-add1" />
              </p>
              <p>
                <label for="b-add2">Address 2:</label>
                <input type="text" name="b-add2" id="b-add2" />
              </p>
              <p>
                <label for="b-city">City:</label>
                <input type="text" name="b-city" id="b-city" />
              </p>
              <p>
                <label for="b-state">State:</label>
                <input type="text" name="b-state" id="b-state" />
              </p>
              <p>
                <label for="b-zip">Zip Code:</label>
                <input type="text" name="b-zip" id="b-zip" />
              </p>
            </fieldset>
          </div>
        </div>
        <h3>
          <button
            aria-expanded="false"
            class="Accordion-trigger"
            aria-controls="sect3"
            id="accordion3id"
          >
            <span class="Accordion-title">
              Shipping Address
              <span class="Accordion-icon"></span>
            </span>
          </button>
        </h3>
        <div
          id="sect3"
          role="region"
          aria-labelledby="accordion3id"
          class="Accordion-panel"
          hidden=""
        >
          <div>
            <fieldset>
              <p>
                <label for="m-add1">Address 1:</label>
                <input type="text" name="m-add1" id="m-add1" />
              </p>
              <p>
                <label for="m-add2">Address 2:</label>
                <input type="text" name="m-add2" id="m-add2" />
              </p>
              <p>
                <label for="m-city">City:</label>
                <input type="text" name="m-city" id="m-city" />
              </p>
              <p>
                <label for="m-state">State:</label>
                <input type="text" name="m-state" id="m-state" />
              </p>
              <p>
                <label for="m-zip">Zip Code:</label>
                <input type="text" name="m-zip" id="m-zip" />
              </p>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
