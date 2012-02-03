jQuery.fn.grappelli = function() {
	console.log("Grappelli in action!");

	this.each(function() {
		var renderer = new Vex.Flow.Renderer(this, Vex.Flow.Renderer.Backends.CANVAS);
		var context = renderer.getContext();
		var stave = new Vex.Flow.Stave(10, 0, 500);

		stave.addClef("treble").setContext(context).draw();

		this.voice = new Vex.Flow.Voice({
			num_beats: 4,
			beat_value: 4,
			resolution: Vex.Flow.RESOLUTION
		});
		
		this.notes = [
			// A quarter-note C.
			new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),

			// A quarter-note D.
			new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),

			// A quarter-note rest. Note that the key (b/4) specifies the vertical
			// position of the rest.
			new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),

			// A C-Major chord.
			new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" })
		];
		
		this.voice.addTickables(this.notes);
		var formatter = new Vex.Flow.Formatter().joinVoices([this.voice]).format([this.voice], 66);
		
		this.voice.draw(context, stave);

//		new Vex.Flow.BarNote();
	
	
		$(this).click(function(e){
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			debugger;
			
			//this.note[0].keys[]
			//this.note[0].duration
			
			var staveNotes = this.voice.getTickables();
			
			for(var staveNoteIdx in staveNotes) {
				var staveNote = staveNotes[staveNoteIdx];
				staveNote.keys[0] = "c/4";
				staveNotes[staveNoteIdx] = new Vex.Flow.StaveNote({ keys: staveNote.keys, duration: staveNote.duration });
				
//				staveNote.getAbsoluteX()			
			}

			this.voice.setTickables(this.notes);
			var formatter = new Vex.Flow.Formatter().joinVoices([this.voice]).format([this.voice], 66);
		
			this.voice.draw(context, stave);
				
			alert("Grappelli in action! (" + e.pageX + "/" + e.pageY + ")");
			
		});
    });	
};