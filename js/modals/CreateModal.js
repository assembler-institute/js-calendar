import { element, readArray } from "../variables.js";

class CreateModal{

    #structure = [
                   //modal
                   element("div", null, "modal", "tabindex", "-1"),
                       [
                        //top modal (move and close)
                        element("div", null, "modal-top"),
                        [
                            element("span"),
                            [
                                element("img", null, null, "src", "../assets/imgs/menu.png")
                            ],
                            element("span"),
                            [
                                element("img", "close-modal", null, "src", "../assets/imgs/close.png")
                            ]
                        ],
                        //body modal
                        element("div"),
                        [
                            //form
                            element("form", "main-form"),
                            [
                                //title
                                element("div", null, "submodal input-name"),
                                [
                                    element("input", "title", null, "maxlength", "60")
                                ],
                                //select date
                                element("div", null, "submodal date"),
                                [
                                    element("span"),
                                    [
                                        element("img", null, null, "src", "../assets/imgs/clock.png")
                                    ],
                                    element("div", null, "event-time"),
                                    [
                                        element("span", null, null,  null, null, "Sábado, 13 de noviembre"),
                                        element("span", null, null,  null, null, "12:00 - 1:00")
                                    ],
                                    element("span"),
                                    [
                                        element("img", null, null, "src", "../assets/imgs/calendar.png")
                                    ]
                                ],
                                //checkbox date end
                                element("div", null, "submodal checkbox-date-end"),
                                [
                                    element("input", "date-checkbox", "checkbox", "type", "checkbox"),
                                    element("span", null, null, null, null, "End date")
                                ],
                                //checkbox reminder
                                element("div", null, "submodal checkbox-reminder"),
                                [
                                    element("input", "reminder-checkbox", "checkbox", "type", "checkbox"),
                                    element("span", null, null, null, null, "Reminder")
                                ],
                                //description
                                element("div", null, "submodal description"),
                                [
                                    element("span"),
                                    [
                                        element("img", null, "flipX", "src", "../assets/imgs/description.png")
                                    ],
                                    element("p", null, "description-p", null, null, "Add a description"),
                                ],
                                //type of event
                                element("div", null, "submodal type-event"),
                                [
                                    element("span", null, null, null, null, "Type of event:"),
                                    element("select", null, "select-type-event"),
                                        [
                                            element("option", null, null, "value", "1","Meeting"),
                                            element("option", null, null, "value", "2","Personal"),
                                            element("option", null, null, "value", "3","Study"),
                                            element("option", null, null, "value", "4","Other")
                                        ]
                                ],
                                //save
                                element("div", null, "submodal buttons"),
                                [
                                    element("button", "cancel-button", "button", null, null, "Cancel"),
                                    element("button", "save-button", "button", null, null, "Save")
                                ]
                            ]
                        ]
                       ]
                ];

    constructor(){
        readArray(this.#structure);
        
        const modal = document.querySelector(".modal");

        //close event
        const close = document.getElementById("close-modal");
        close.addEventListener("click", function(){
            modal.parentNode.removeChild(modal);
        });
        
        //title input
        const title = document.getElementById("title");
        title.setAttribute("type", "text");
        title.setAttribute("placeholder", "Add a title");
        title.required = true;
        
        //date checkbox structure + add/remove
        const dateCheckbox = document.getElementById("date-checkbox");
        dateCheckbox.addEventListener("change", function(e){
            const dateEndStructure = [
                                      element("div", null, "submodal date date-end"),
                                          [
                                              element("span"),
                                              [
                                                  element("img", null, null, "src", "../assets/imgs/clock.png")
                                              ],
                                              element("div", null, "event-time"),
                                              [
                                                  element("span", null, null,  null, null, "Domingo, 14 de noviembre"),
                                                  element("span", null, null,  null, null, "12:00 - 1:00")
                                              ],
                                              element("span"),
                                              [
                                                  element("img", null, null, "src", "../assets/imgs/calendar.png")
                                              ]
                                          ]
                                     ];
            const checkboxDateEnd = document.querySelector(".checkbox-date-end");
            if(dateCheckbox.checked === true){
                readArray(dateEndStructure, null);
                checkboxDateEnd.parentNode.insertBefore(dateEndStructure[0], checkboxDateEnd.nextSibling);
            } else {
                const dateEnd = document.querySelector(".date-end");
                dateEnd.parentNode.removeChild(dateEnd);
            }
        });

        //description change p to textarea
        const description = document.querySelector(".description-p");
        description.addEventListener("click", function(){
            const textArea = element("textarea", null, "description-textarea", "placeholder", "Write here...");
            textArea.setAttribute("maxlength", "500");
            textArea.setAttribute("rows", "2");
            description.parentNode.appendChild(textArea);
            description.parentNode.removeChild(description);
        });

        //reminder add/remove select
        const reminderCheckbox = document.getElementById("reminder-checkbox");
        reminderCheckbox.addEventListener("change", function(e){
            const reminderStructure =  [
                                        element("select", null, "select-reminder"),
                                        [
                                            element("option", null, null, "value", "1","5 minutes"),
                                            element("option", null, null, "value", "2","10 minutes"),
                                            element("option", null, null, "value", "3","15 minutes"),
                                            element("option", null, null, "value", "4","30 minutes"),
                                            element("option", null, null, "value", "5","1 hour"),
                                        ]
                                      ];
            const checkboxReminder = document.querySelector(".checkbox-reminder");
            if(reminderCheckbox.checked === true){
                readArray(reminderStructure, null);
                checkboxReminder.appendChild(reminderStructure[0]);
            } else {
                const selectReminder = document.querySelector(".select-reminder");
                selectReminder.parentNode.removeChild(selectReminder);
            }
        });

        //cancel button
        const cancelButton = document.getElementById("cancel-button");
        cancelButton.addEventListener("click", function(){
            //Se auto refresca
            const form = document.getElementById("main-form");
            form.noValidate = true;
            //form.submit();
            /*form.on('submit', function (event) {
                event.preventDefault();
            });*/
            console.log(form);
            modal.parentNode.removeChild(modal);
        });

        //save button
        const saveButton = document.getElementById("save-button");
        saveButton.addEventListener("click", function(){
            //code of save
        });

        //modal listener
        this.focus();
        modal.addEventListener("focusout", function(e){
            if(e.sourceCapabilities === null || e.relatedTarget === saveButton) return;
            if( e.relatedTarget === modal ||
                e.relatedTarget === modal.childNodes[1].childNodes[0][0] || //input
                e.relatedTarget === modal.childNodes[1].childNodes[0][1] || //date-checkbox
                e.relatedTarget === modal.childNodes[1].childNodes[0][2] || //reminder-checkbox
                e.relatedTarget === modal.childNodes[1].childNodes[0][3] || //select
                e.relatedTarget === modal.childNodes[1].childNodes[0][4] || //textarea
                e.relatedTarget === modal.childNodes[1].childNodes[0][5] || //button
                e.relatedTarget === modal.childNodes[1].childNodes[0]){} 
            else modal.parentNode.removeChild(modal);
        });
        
            /*-------
                initial date with time - required

                checkbox with end date
                    check doc to more info

                checkbox reminder
                    use SetInterval every 10sec

                ???WARNING box - event expired = red bold + doc more info
            */

        //esc key

        //add event to calendar
    }

    focus(){
        const modal = document.querySelector(".modal");
        if(modal !== undefined){
            modal.focus();
        }
    }

}

export default CreateModal;