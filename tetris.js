let grille;
let grille_2;
let rafraichissement = null;
let piece_espace = null;
let touche_espace = false;

function start()
{
    if (touche_espace){return;}
    grille = new Grille();
    grille_2 = new Grille();
    document.addEventListener('keydown', checkKey)
    let tetris = document.getElementById("tetris");
    tetris.innerHTML = "";
    document.getElementById("piece").innerHTML = "";
    if (rafraichissement != null){clearInterval(rafraichissement)}

    let table = document.createElement("table");
    for (let i = 0; i < 20; i ++)
    {
        let tr = document.createElement('tr');
        tr.id = "tr_" + i;
        for (let j = 0; j < 10; j++)
        {
            let td = document.createElement("td");
            td.id = j + "_" + i;
            td.classList.add("block")
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    tetris.appendChild(table);

    let next_piece = document.createElement("table");
    for (let i = 0; i < 3; i++)
    {
        let tr = document.createElement("tr");
        for (let j = 0; j < 4; j++)
        {
            let td = document.createElement("td");
            td.id = "piece_" + i + "_" + j;
            tr.appendChild(td);
        }
        next_piece.appendChild(tr);
    }
    document.getElementById("piece").appendChild(next_piece);
    let rec = document.createElement("button");
    rec.onclick = start;
    rec.innerText = "Recommencer";
    document.getElementById("recommencer").innerHTML = "";
    document.getElementById("recommencer").appendChild(rec);
    reprendre();

    grille.init();
}

function affiche(update = true)
{
    grille.update(update, grille_2);

    for (let i = 0; i < 20; i++)
    {
        for (let j = 0; j < 10; j++)
        {
            document.getElementById(j + "_" + i).className = "block";
        }
    }
    for (let i = 0; i < grille.blocks.length; i++)
    {
        for (let j = 0; j < grille.blocks[i].length; j++)
        {
            if (grille.blocks[i][j] instanceof Block)
            {
                if (document.getElementById(grille.blocks[i][j].x + "_" + grille.blocks[i][j].y) == null)
                {
                    console.log(grille.blocks[i][j].x + "_" + grille.blocks[i][j].y)
                }
                document.getElementById(grille.blocks[i][j].x + "_" + grille.blocks[i][j].y).classList.add(grille.blocks[i][j].color);
            }
        }
    }

    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 4; j++)
        {
            document.getElementById("piece_" + i + "_" + j).className = "block";
        }
    }

    for (let i = 0; i < grille_2.piece_actuelle.blocks.length; i++)
    {
        if (typeof grille_2.piece_actuelle.blocks[i].y !== "undefined")
        {
            console.log(grille_2.piece_actuelle.blocks[i].y + "_" + (grille_2.piece_actuelle.blocks[i].x-4))
            let nb = grille_2.piece_actuelle.x
            document.getElementById("piece_" + grille_2.piece_actuelle.blocks[i].y + "_" + (grille_2.piece_actuelle.blocks[i].x-nb)).classList.add(grille_2.piece_actuelle.blocks[i].color);
        }
    }

    document.getElementById("score").innerText = grille.score;
}

function stop()
{
    clearInterval(rafraichissement);
}

function reprendre()
{
    clearInterval(rafraichissement)
    rafraichissement = setInterval(affiche, 800);
}


function checkKey(e)
{
    if (e.keyCode === 40 && grille.piece_actuelle.peut_bouger())
    {
        e.preventDefault();
        grille.piece_actuelle.bouge();
        affiche(false)
    }
    else if (e.keyCode === 37 && grille.piece_actuelle.peut_aller_a_gauche())
    {
        e.preventDefault();
        grille.piece_actuelle.bouge_gauche();
        affiche(false);
    }
    else if (e.keyCode === 39 && grille.piece_actuelle.peut_aller_a_droite())
    {
        e.preventDefault();
        grille.piece_actuelle.bouge_droite();
        affiche(false);
    }
    else if (e.keyCode === 38)
    {
        e.preventDefault();
        grille.piece_actuelle.rotation();
        affiche(false)
    }

    else if (e.keyCode === 32)
    {
        touche_espace = true;
        e.stopPropagation();
        e.preventDefault();
        if (piece_espace === grille.piece_actuelle)
        {
            return;
        }
        piece_espace = grille.piece_actuelle
        while (piece_espace.peut_bouger())
        {
            piece_espace.bouge();
            console.log("c")
        }
        affiche(false);
        touche_espace = false;
    }
}