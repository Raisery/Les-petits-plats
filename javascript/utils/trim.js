
function trim() {
    //lorsqu'on est a la derniere ligne, si c'est pas fini on cherche le point,
    // si il n'y en a pas on va jusqu'a la ligne d'aprés si il faut et on s'arrete a la premiere virgule
    const limitCharsByline = 35;
    const descriptions = document.querySelectorAll(".recipe-card__infos__recipe__notice");
    for (let i = 0; i < recipesList.length; i++) {
        descriptions[i].textContent = "";
        const description = recipesList[i].description;
        const nbLinesMax = recipesList[i].ingredients.length;
        const descripitonChars = description.split('');
        if(descripitonChars[descripitonChars.length-1] != ".") {
            descripitonChars.push(".");
        }
        const descripitonLines = [];
        var line = "";
        var finish = false
        for (var char of descripitonChars) {
            if (descripitonLines.length <nbLinesMax) {
                line += char;
                if (line.length == limitCharsByline) {
                    descripitonLines.push(line);
                    line = "";
                }
            }

        }

        descripitonLines.push(line);
       
        while (!descripitonLines[descripitonLines.length - 1].endsWith(".")) {

            var lastLine = descripitonLines[descripitonLines.length - 1];
            if (lastLine.includes(".")) {
                lastLine = lastLine.slice(0, lastLine.lastIndexOf(".") + 1);
                descripitonLines.pop();
                descripitonLines.push(lastLine+" ...");
            }
            else if (lastLine.includes(",")) {
                lastLine = lastLine.slice(0, lastLine.lastIndexOf(",") + 1);
                descripitonLines.pop();
                descripitonLines.push(lastLine+" ...");
            }
            else {
                descripitonLines.pop();
            }
        }

        for (line of descripitonLines) {
            descriptions[i].textContent += line;            
        }



        //visualisation
       /*  var vvnb = "";
        var vline = ""
        var total = 0;
        for (line of descripitonLines) {
            vline += line + "|";
            var vnb = "";

            for (var nb = 0; nb < line.length; nb++) {
                total++;
                if (Math.floor(line.length / 2) == nb) {
                    if (nb.toString().length == 2) {
                        vnb = vnb.slice(0, vnb.length - 1);
                        vnb += line.length.toString();
                    }
                    else {
                        vnb += line.length.toString();
                    }

                }
                else {
                    vnb += " ";
                }
            }
            vvnb += vnb + "|";
            
        }


        console.log(vline);
        console.log(vvnb);
        console.log(total); */
        
        

    }
}

trim();