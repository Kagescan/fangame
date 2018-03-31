# Branch : New engine

I noticed that the syntax of my script is horrible so i'm working for a new synthax, like ren'py !

I should remake the novel engine from zero !


old synthax exemple (branch novelEngine)
```
porte3;
`5`resources/img/backgrounds/classroom.night.jpg;
`2`sound`play`resources/sounds/OldDays02.ogg`;
`3`0`resources/img/sprite/Ayano5.png;
`4`pause`500;
`1`Shintaro / inconnue???`-Whaaaaaaah !!!_-OUAAAHAAHAHAHA!!!Hiiii!!!;
`4`pause`2200;
`2`sound`pause;
`4`Epause;

`1`Shintaro`Pardonnez moi !Pardonnez moi !_L-Laissez moi la vie sau~auve!!!;
`2`sound`unpause;
`4`pause`3150;
`2`sound`pause;
`4`Epause;

`3`0`resources/img/sprite/Ayano6.png;
`1`???`Hum?;
`2`sound`unpause;
`4`pause`900;
`2`sound`pause;
`4`Epause;

`1`???`Shintarou...-kun?;
```

new synthax exemple (this branch)
```
label part1
  scene bg=background.classroom bg-color=0,0,0 bar-color=255,255,255,100 transition=fade ease=inExpo
  show shintaro at=right transition=slide ease=none image=shintaro.default
  play ost03 "loop"
  shintaro "hey i'm shintaro and it is a test for the kagerou project fangame." "This is the second line" "and the final line !"
  stop ost03
  play chairs
  shintaro "HUH? what is it ??"
  logan "My code is bad?"
  choice hope="this will work" noHope="bullshit"
endLabel

label noHope
show shintaro at=right transition=none image=shintaro.scary
shintaro "huh... you're not cool !"
goto end
endLabel

label hope
shintaro "you are cool !!"
endLabel

label end
end
endLabel
```

