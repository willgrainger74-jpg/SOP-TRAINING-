/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — plumbing & water modules (sop-plumbing.js)
   ═══════════════════════════════════════════════════════════════════ */
(function () {
const S = window.SOP.S, M = window.SOP.modules;
const END_CHECK = [`Job site cleaned, old equipment hauled away`, `Before and after photos taken`, `Customer shown operation and shutoffs`];
const BASE_RECORD = [`Job address and date`, `Equipment model and serial numbers`];
const SIGN_RECORD = [`Lead installer and helper names`];

/* ── 9. TANKLESS ────────────────────────────────────────────────── */
M.push({ id: `tankless`, trade: `plumbing`, art: `tankless`, title: `Tankless Water Heater Install`, short: `Tankless`,
  desc: `Gas tankless water heater: gas sizing, venting, condensate, isolation valves, water quality, setup and commissioning.`,
  expect: [`Gas supply is proven with a manometer at full fire. A tankless that is short on gas is the most common callback there is.`, `Isolation valves go on every tankless so it can be descaled.`],
  sections: [ S.arrive,
    { t: `Plan the job before the old heater comes out`, why: `A tankless burns three to five times the gas of the tank it replaces. The gas, vent and power have to be there.`, steps: [
      `Read the installation manual for the exact model. Requirements differ by brand and model.`,
      `Add up the BTU load of every gas appliance in the home, including the new tankless. Confirm the meter and regulator can carry it. If not, the gas utility has to upgrade the meter first.`,
      `Size the gas line from the meter to the heater with the sizing table for the length of the run and the total load. Follow the manual on minimum pipe size.`,
      `Plan the vent route: material, maximum length, number of elbows and where it terminates.`,
      `Confirm there is a 120-volt outlet for the heater, or plan one.`,
      `Confirm a drain is available for the condensate on a condensing model.`,
      `Test the water hardness. Hard water needs treatment or a firm descaling schedule.`
    ], stop: `Meter or gas line too small: do not install and hope. Call your manager.` },
    { t: `Remove the old heater & mount the tankless`, why: `It hangs on the wall full of water and heat exchanger. It needs real backing.`, steps: [
      `Shut off gas, power and water, drain and remove the old heater as the Rheem water heater SOPs describe. Cap the old vent opening if it is no longer used.`,
      `If another appliance shared the old vent, check that it still drafts properly by itself.`,
      `Mount the heater on studs or solid backing with the fasteners the manual calls for, level and plumb.`,
      `Keep the service clearances in the manual on every side, and room below for the valves and piping.`,
      `Indoor models go indoors, outdoor models go outdoors. Do not mix them up.`,
      `Protect the heater and its piping from freezing. Freeze protection built into the heater only works while it has power.`
    ] },
    { t: `Gas piping`, why: `Undersized gas is the number one tankless problem.`, steps: [
      S.gas.steps[0],
      `Run the gas line at the size the sizing table gives for the full load and length. Do not connect a tankless to the old water heater's 1/2-inch branch unless the manual and the table say it will carry it.`,
      S.gas.steps[1], S.gas.steps[2],
      `Use a full-flow gas connector rated for the heater's BTU input, or hard pipe. A standard appliance connector will starve it.`,
      S.gas.steps[4], S.gas.steps[7],
      `Measure inlet gas pressure with a manometer, static and then with the heater at maximum fire and the other gas appliances running. It must stay inside the range on the rating plate.`
    ], stop: S.gas.stop },
    { t: `Venting & combustion air`, why: `The vent is a sealed, pressurized system. Only the listed material and layout are allowed.`, steps: [
      `Use only the vent material and size the manual lists for the model: plastic or polypropylene on condensing models, stainless Category III on non-condensing models.`,
      `Never vent a tankless into an old B-vent or chimney, and never share its vent.`,
      `Stay inside the maximum vent length, counting each elbow as equivalent length.`,
      `Slope the vent the direction the manual shows so condensate drains where it is designed to.`,
      `Support the vent, and prime and cement or gasket every joint the way the vent manufacturer requires.`,
      `Terminate at the clearances in the manual: from windows, doors, corners, meters, grade and each other.`,
      `Pipe combustion air from outdoors on a direct-vent install. On a room-air install, confirm the room has the combustion air the manual requires.`
    ] },
    { t: `Water connections, relief valve & condensate`, why: `The isolation valves are what make the heater serviceable for the next fifteen years.`, steps: [
      `Install an isolation valve kit with service ports on the hot and cold connections.`,
      `Install the pressure relief valve the manual calls for on the hot side, with a full-size discharge pipe run the same way as a tank heater's: gravity drain, no valve, no threads, ending near the floor or at an approved drain.`,
      `Flush the water lines before connecting them so solder and debris do not plug the inlet filter.`,
      `Cold to the cold inlet, hot to the hot outlet. Check the labels.`,
      `Condensing models: run the condensate drain sloped to an approved drain, with a neutralizer where code or the drain material calls for one. Do not let it freeze.`,
      `Insulate the hot and cold piping, and heat-trace exposed outdoor piping where it freezes.`,
      `Where a recirculation system is part of the job, pipe and set it up the way the manual shows for that model.`
    ] },
    { t: `Power, settings & commissioning`, why: `The heater has to be told what gas, what altitude and what vent it has.`, steps: [
      `Plug into a properly grounded 120-volt outlet, GFCI-protected where code requires. No extension cords.`,
      `Open the water and purge all the air through the hot faucets before powering the heater.`,
      `Check every water and gas joint for leaks.`,
      `Set the dip switches or parameters for gas type, altitude and vent length exactly as the manual shows. Utah installs need the high-altitude setting.`,
      `Power up, set the temperature to 120 degrees, and open several hot faucets to bring the heater to full fire.`,
      `Confirm gas pressure holds at full fire and there are no error codes.`,
      `Run the heater at low flow as well, a single faucet, and confirm it lights and holds temperature.`,
      `Shut off the water, then clean the inlet filter screen. Construction debris collects there in the first few minutes.`,
      `Check the condensate is draining.`,
      `Show the customer: how to set the temperature, that it needs a moment of flow to fire, and that it must be descaled on the schedule the manufacturer and your water hardness call for.`
    ] },
    S.closeout ],
  checklist: [`Total gas load checked against meter capacity`, `Gas line sized from the table for load and length`, `Sediment trap and shutoff installed, joints leak-tested`, `Gas pressure in range at full fire with other appliances running`, `Heater mounted on solid backing, clearances met`, `Listed vent material, length within limit`, `Vent joints sealed, terminations at listed clearances`, `Isolation valve kit with service ports installed`, `Relief valve and discharge pipe installed`, `Lines flushed, air purged before power`, `Condensate drain and neutralizer installed`, `Gas type, altitude and vent settings made`, `Temperature set to 120 degrees`, `No error codes at high and low flow`, `Inlet filter screen cleaned after startup`, `Old vent opening capped`, ...END_CHECK],
  record: [...BASE_RECORD, `Total connected gas load (BTU/h)`, `Gas line size and length`, `Inlet gas pressure: static and full fire`, `Vent material and equivalent length`, `Water hardness (gpg)`, `Altitude and gas-type settings`, ...SIGN_RECORD],
  quiz: [
    { q: `What do you check before a tankless is installed, that a tank replacement usually does not need?`, a: [`That the meter and gas line can carry the total BTU load including the tankless`, `That the home has a floor drain`, `That the attic is insulated`, `That the main shutoff is a ball valve`], r: `Plan the job` },
    { q: `The meter cannot carry the added load. What happens?`, a: [`The gas utility upgrades the meter first; call your manager`, `Install it and turn the temperature down`, `Install a second regulator`, `Remove the sediment trap to gain flow`], r: `Plan the job` },
    { q: `How is the gas line sized?`, a: [`From the sizing table, for the total load and the length of the run`, `Same as the old water heater's branch`, `Always 1/2 inch`, `By the size of the heater's inlet fitting`], r: `Gas piping` },
    { q: `When is inlet gas pressure measured?`, a: [`Static, then at maximum fire with the other gas appliances running`, `Static only`, `At minimum fire only`, `Only if there is an error code`], r: `Gas piping` },
    { q: `Why not use a standard appliance gas connector?`, a: [`It will starve the heater; use a full-flow connector rated for the BTU input, or hard pipe`, `It is too long`, `It is the wrong color`, `It leaks at high altitude`], r: `Gas piping` },
    { q: `Can a tankless vent into the old water heater's B-vent?`, a: [`No. Only the listed vent material, and it never shares a vent`, `Yes, on non-condensing models`, `Yes, if the run is short`, `Yes, with a draft hood`], r: `Venting & combustion air` },
    { q: `What goes on the hot and cold connections of every tankless?`, a: [`An isolation valve kit with service ports`, `Check valves`, `Flexible washing-machine hoses`, `Nothing but unions`], r: `Water connections, relief valve & condensate` },
    { q: `Why are isolation valves with service ports installed?`, a: [`So the heat exchanger can be descaled`, `To raise water pressure`, `To meet the gas code`, `To stop the cold-water sandwich`], r: `Water connections, relief valve & condensate` },
    { q: `What do you do to the water lines before connecting them?`, a: [`Flush them so debris does not plug the inlet filter`, `Pressurize them with nitrogen`, `Fill them with vinegar`, `Nothing`], r: `Water connections, relief valve & condensate` },
    { q: `What is done right after the first startup run?`, a: [`Shut off the water and clean the inlet filter screen`, `Descale the heat exchanger`, `Replace the relief valve`, `Raise the temperature to 140`], r: `Power, settings & commissioning` },
    { q: `Which settings must match the installation?`, a: [`Gas type, altitude and vent length`, `Wi-Fi name and time zone only`, `Number of bathrooms`, `None, the heater detects them`], r: `Power, settings & commissioning` },
    { q: `What does a Utah install need that a sea-level install does not?`, a: [`The high-altitude setting`, `A larger relief valve`, `A smaller vent`, `LP orifices`], r: `Power, settings & commissioning` },
    { q: `What does the heater's built-in freeze protection depend on?`, a: [`Power to the heater`, `Gas pressure`, `Water hardness`, `The isolation valves being closed`], r: `Remove the old heater & mount the tankless` },
    { q: `Where does condensate from a condensing tankless go?`, a: [`Sloped to an approved drain, with a neutralizer where required, protected from freezing`, `Onto the ground under the heater`, `Into the vent`, `Into the relief valve discharge pipe`], r: `Water connections, relief valve & condensate` },
    { q: `How is the heater tested at commissioning?`, a: [`At full fire with several faucets, and at low flow with a single faucet`, `At one faucet for 30 seconds`, `By reading the display only`, `With the gas off`], r: `Power, settings & commissioning` },
    { q: `What is the hard-water issue with tankless heaters?`, a: [`Scale builds in the heat exchanger, so the water is treated or the heater is descaled on schedule`, `Hard water raises gas pressure`, `Hard water corrodes the vent`, `There is none`], r: `Plan the job` },
    { q: `How is the heater powered?`, a: [`A grounded 120-volt outlet, GFCI where code requires, no extension cord`, `An extension cord from the nearest outlet`, `Off the furnace transformer`, `It needs no power`], r: `Power, settings & commissioning` },
    { q: `Another appliance shared the old tank's vent. What must you check?`, a: [`That it still drafts properly by itself`, `Nothing`, `That its gas line is larger`, `That it is also converted to tankless`], r: `Remove the old heater & mount the tankless` },
    { q: `Each vent elbow does what to the allowed length?`, a: [`Counts as equivalent length against the maximum`, `Adds to the maximum`, `Has no effect`, `Only counts on the intake`], r: `Venting & combustion air` },
    { q: `What must be done before the heater is powered up?`, a: [`Open the water and purge all the air through the hot faucets`, `Set the temperature`, `Clean the filter`, `Light the pilot`], r: `Power, settings & commissioning` }
  ] });

/* ── 10. WATER SOFTENER ─────────────────────────────────────────── */
M.push({ id: `softener`, trade: `plumbing`, art: `softener`, title: `Water Softener Install`, short: `Water Softener`,
  desc: `Test the water, plumb the softener with a bypass, run the drain through an air gap, program it, and prove soft water at the tap.`,
  expect: [`The water is tested before and after. The job is not finished until a tap in the home tests soft.`, `The drain line always discharges through an air gap. It is never connected directly to a sewer or drain pipe.`],
  sections: [ S.arrive,
    { t: `Test the water & plan the install`, why: `The softener is programmed from the test, and the location decides what gets soft water.`, steps: [
      `Test the incoming water for hardness in grains per gallon, and for iron. Write the numbers down.`,
      `Check the house water pressure. It must be inside the softener's operating range and not above 80 PSI.`,
      `Choose a level spot that will not freeze, near a drain and an unswitched outlet, with room to add salt.`,
      `The softener goes after the pressure-reducing valve and before the water heater.`,
      `Outdoor hose bibs and irrigation stay on hard water. Use the existing softener loop where the home has one.`,
      `Ask the customer whether they want the kitchen cold tap or the refrigerator on hard or soft water, and plumb it the way they decide.`,
      `Confirm the softener is the size the work order calls for.`
    ] },
    { t: `Plumb the softener & bypass`, why: `The control valve is plastic. Heat and backwards piping are what kill it.`, steps: [
      `Shut off the main, open a low faucet and drain the lines. Shut off the water heater.`,
      `Cut into the line at the planned location.`,
      `Follow the arrows on the valve: supply to the inlet, house to the outlet. Check it twice before you connect.`,
      `Install the softener's bypass valve so the unit can be taken out of service without shutting off the house.`,
      `Solder adapters before you connect them to the valve, or use approved push-fit or flexible connectors. Never put a torch near the plastic valve.`,
      `Support the piping so its weight and strain are not on the valve.`,
      `If you cut out a section of metal pipe that was part of the home's electrical ground path, restore it with a bonding jumper around the softener.`,
      `Keep the distance from the water heater that the manual calls for, or protect the softener from hot water backing up.`
    ] },
    { t: `Drain line & brine tank overflow`, why: `A softener drain tied straight into the sewer is a cross-connection. The air gap is what protects the customer's drinking water.`, steps: [
      `Run the drain line at the size the manual calls for, 1/2-inch inside diameter minimum, without kinks.`,
      `Keep the drain run inside the length and height limits in the manual.`,
      `End the drain line through an air gap above the drain, standpipe or floor sink: at least twice the pipe diameter and never less than 1 inch above the flood rim.`,
      `Secure the end of the drain line. It discharges under pressure and will whip.`,
      `Run the brine tank overflow separately by gravity to a drain. It is never tied into the pressurized drain line and it never runs uphill.`,
      `Connect the brine line between the valve and the brine tank and tighten the fittings so it cannot draw air.`
    ], stop: `No air gap, no start-up.` },
    { t: `Start-up`, why: `Opening the water too fast can blow resin into the house lines.`, steps: [
      `With the softener in bypass, turn the main on and flush the house lines at a cold faucet until the water runs clear.`,
      `Put the valve in the backwash position, then open the inlet slowly, part way, to let the tank fill and push the air out the drain.`,
      `When the drain runs a steady stream with no air, open the inlet fully.`,
      `Check every joint for leaks.`,
      `Add the amount of water to the brine tank the manual calls for, then add salt.`,
      `Plug the control into an unswitched outlet.`,
      `Run a manual regeneration and watch it move through each cycle: brine is drawn, the tank rinses, the brine tank refills.`,
      `Turn the water heater back on.`
    ] },
    { t: `Program & prove`, why: `A softener set to the wrong hardness either wastes salt or lets hard water through.`, steps: [
      `Set the time of day.`,
      `Set the hardness from your test. Add to the setting for iron the way the manual says.`,
      `Set the regeneration time for when nobody uses water, normally the middle of the night.`,
      `Set any capacity, salt-dose or household-size settings the valve asks for.`,
      `Test the water at a tap inside the home. It should test soft, 0 to 1 grain per gallon.`,
      `Confirm the hose bibs and anything else meant to stay hard are still hard.`,
      `Show the customer how to add salt, how to use the bypass, and how to tell when it regenerates.`
    ] },
    S.closeout ],
  checklist: [`Hardness and iron tested and recorded`, `House pressure in range`, `Softener after the PRV and before the water heater`, `Hose bibs and irrigation left on hard water`, `Inlet and outlet correct by the arrows`, `Bypass valve installed`, `No torch heat on the plastic valve`, `Piping supported, bonding jumper restored`, `Drain line through an air gap, end secured`, `Brine overflow run separately by gravity`, `Air purged slowly in backwash`, `No leaks`, `Salt and water in the brine tank`, `Hardness, time and regeneration time programmed`, `Manual regeneration run and watched`, `Tap tests soft (0 to 1 gpg)`, `Water heater back on`, ...END_CHECK],
  record: [...BASE_RECORD, `Raw water hardness (gpg) and iron`, `House water pressure (PSI)`, `Hardness setting programmed`, `Regeneration time`, `Treated water test result (gpg)`, ...SIGN_RECORD],
  quiz: [
    { q: `How does a softener drain line end?`, a: [`Through an air gap above the drain, at least twice the pipe diameter and never less than 1 inch`, `Glued directly into the drain pipe`, `Pushed 6 inches down into the standpipe`, `Tied into the T&P discharge`], r: `Drain line & brine tank overflow` },
    { q: `Why is the air gap required?`, a: [`A direct connection is a cross-connection that can pull sewage back toward the drinking water`, `It makes the drain quieter`, `It lets the brine evaporate`, `It is only cosmetic`], r: `Drain line & brine tank overflow` },
    { q: `How is the brine tank overflow run?`, a: [`Separately, by gravity, to a drain`, `Tied into the pressurized drain line`, `Up and over to the laundry box`, `It is capped`], r: `Drain line & brine tank overflow` },
    { q: `Where does the softener go in the piping?`, a: [`After the pressure-reducing valve and before the water heater`, `After the water heater`, `Before the pressure-reducing valve`, `On the hot line only`], r: `Test the water & plan the install` },
    { q: `What stays on hard water?`, a: [`Outdoor hose bibs and irrigation`, `The showers`, `The water heater`, `The washing machine`], r: `Test the water & plan the install` },
    { q: `What is the rule about soldering at the softener?`, a: [`Solder adapters before connecting them; never put a torch near the plastic valve`, `Solder directly at the valve with a wet rag`, `Use a hotter torch to be quick`, `Soldering is not allowed anywhere on the job`], r: `Plumb the softener & bypass` },
    { q: `How do you first open water to the softener?`, a: [`Valve in backwash, inlet opened slowly and part way until the drain runs with no air`, `Open the inlet fully and fast`, `With the valve in service and all faucets closed`, `With the drain line capped`], r: `Start-up` },
    { q: `What can opening the water too fast do?`, a: [`Blow resin into the house lines`, `Soften the water too much`, `Dissolve the salt`, `Reset the timer`], r: `Start-up` },
    { q: `What do you do before putting the softener in service on new piping?`, a: [`Flush the house lines in bypass until the water runs clear`, `Run a regeneration with no salt`, `Drain the water heater`, `Nothing`], r: `Start-up` },
    { q: `What is the hardness setting based on?`, a: [`Your test of the incoming water, adjusted for iron as the manual says`, `The factory default`, `The number of bathrooms`, `The city's average from memory`], r: `Program & prove` },
    { q: `How do you know the job is finished?`, a: [`A tap inside the home tests soft, 0 to 1 grain per gallon`, `The display shows the time`, `The drain line is dripping`, `The salt level has dropped`], r: `Program & prove` },
    { q: `What kind of outlet does the control need?`, a: [`Unswitched`, `Switched with the garage light`, `A 240-volt outlet`, `None, it runs on water pressure`], r: `Start-up` },
    { q: `You removed a section of copper that was part of the electrical ground path. What is required?`, a: [`A bonding jumper around the softener`, `Nothing`, `A plastic union`, `A second ground rod at the softener`], r: `Plumb the softener & bypass` },
    { q: `What must you watch during the manual regeneration?`, a: [`Brine is drawn, the tank rinses, and the brine tank refills`, `Only that the motor makes noise`, `That the house loses water`, `That the salt turns to slush`], r: `Start-up` },
    { q: `Which way is the valve piped?`, a: [`Supply to the inlet and house to the outlet, by the arrows on the valve`, `Either way, the valve is symmetrical`, `Hot to the inlet`, `House to the inlet`], r: `Plumb the softener & bypass` },
    { q: `Why install the bypass valve?`, a: [`So the softener can be taken out of service without shutting off the house`, `To make the water softer`, `To double the capacity`, `Code forbids softeners without one in the service position`], r: `Plumb the softener & bypass` },
    { q: `When is the regeneration time normally set?`, a: [`When nobody uses water, usually the middle of the night`, `Noon`, `Dinner time`, `Whenever the installer finishes`], r: `Program & prove` },
    { q: `What goes into the brine tank at start-up?`, a: [`The amount of water the manual calls for, then salt`, `Salt only, packed to the lid`, `Water only, to the top`, `Resin`], r: `Start-up` },
    { q: `Why secure the end of the drain line?`, a: [`It discharges under pressure and will whip`, `So it looks neat`, `To stop evaporation`, `It is not necessary`], r: `Drain line & brine tank overflow` },
    { q: `What do you test for besides hardness?`, a: [`Iron`, `Fluoride`, `Temperature`, `Oxygen`], r: `Test the water & plan the install` }
  ] });

/* ── 11. HALO 5 ─────────────────────────────────────────────────── */
M.push({ id: `halo5`, trade: `plumbing`, art: `halo`, title: `HALO 5 Water System Install`, short: `HALO 5`,
  desc: `HALO 5 whole-house filtration and conditioning: location, plumbing, drain, charging the tank, flushing and programming, following the HALO installation guide.`,
  expect: [`Read the HALO installation guide in the box. This SOP follows it, and the guide wins where they differ.`, `The system is flushed until the water runs clear and every fixture in the home has been run before you leave. Black carbon water at the customer's tap is our callback, not theirs.`],
  sections: [ S.arrive,
    { t: `Unbox, check parts & choose the location`, why: `The location decides whether the system treats the whole home and whether it survives the winter.`, steps: [
      `Confirm the system size matches the work order and the home's main line.`,
      `Unpack the bag with the bypass assembly, brass adapters and plastic fittings, and check nothing is missing or cracked.`,
      `Set aside the warranty, the valve manual and the water tips brochure. They stay with the homeowner.`,
      `Make your fittings and tools list before you shut the water off. Brass reducers may be needed.`,
      `Choose a protected, dry, level spot that never freezes, such as a garage or laundry room.`,
      `Install it downstream of the pressure regulator. The system is built for 25 to 80 PSI and works best around 60. Check the house pressure with a gauge.`,
      `It goes on the main incoming line so it treats all the water entering the home, hot and cold.`,
      `Confirm there is a grounded 120-volt outlet that is not on a switch within reach of the valve's 15-foot cord, and a place to run the drain.`
    ], stop: `House pressure above 80 PSI, or no regulator: call your manager before installing.` },
    { t: `Plumb the system`, why: `Backwards piping or torch heat on the valve ruins a new system on day one.`, steps: [
      `Turn off the main water valve and drain the line.`,
      `Cut out the section of the main line where the system will sit and let it drain fully.`,
      `Looking at the back of the control valve, the inlet is on the left side of the bypass assembly. The arrow on top of the valve shows the direction of flow. Check it twice.`,
      `Solder the brass adapters onto the inlet and outlet piping before they are connected to the bypass. Keep torch heat away from the valve and bypass.`,
      `Install a ball valve and a hose bib on the outlet side of the system. They are used to flush the system at start-up.`,
      `Install the HALO ION conditioner on the line the way its instructions show, with the flow in the direction marked.`,
      `Support the piping so its weight is not on the valve.`,
      `If the pipe you cut was part of the home's electrical ground path, restore it with a bonding jumper.`
    ] },
    { t: `Drain line & power`, why: `The system cleans itself by backwashing to a drain. No drain, no backwash.`, steps: [
      `The drain outlet on the valve is a 3/4-inch threaded fitting. Use the matching drain fitting.`,
      `Run the drain to an approved drain following local plumbing code, ending through an air gap.`,
      `The drain line is under pressure during backwash, so it can run slightly uphill if it has to. Keep it as short and direct as you can.`,
      `Secure the drain line along its run and at its end.`,
      `Keep the system, its piping and the drain line away from freezing temperatures.`,
      `Plug the control valve into the unswitched outlet. Use an extension cord only where local code allows it.`
    ] },
    { t: `Charge the system & flush`, why: `New carbon sheds black fines. They are flushed out the hose bib, not into the customer's fixtures.`, steps: [
      `Put the bypass valve in the bypass position and turn the main water on.`,
      `Close the new ball valve on the outlet side so nothing flows into the house.`,
      `Open the inlet side of the bypass to fill the tank. It takes less than five minutes.`,
      `Slowly open the outlet side of the bypass halfway and check every joint for leaks.`,
      `With no leaks, open the outlet side fully.`,
      `Open the hose bib and run water for 10 minutes or until it runs consistently clear, then close it.`,
      `Force a regeneration by pressing the up and down arrows together until the cycle starts. It runs about 10 minutes. Watch the drain.`,
      `After the regeneration, flush at the hose bib again until the water is clear.`,
      `Open the ball valve to the house.`
    ] },
    { t: `Program the valve`, why: `The backwash schedule is set to the household, at a time nobody is using water.`, steps: [
      `Set the time of day. Watch the AM/PM indicator.`,
      `Set the regeneration time for when water use is lowest, normally the middle of the night.`,
      `Set the days between regenerations by household size: 11 days for 1 person, 9 days for 2 to 3 people, 7 days for 4 or more. Use the homeowner's preference if they ask for something different.`,
      `Verify the settings on the display the way the valve manual shows, and confirm the days-to-regeneration matches what you set.`,
      `If an E1 or E2 error shows, follow the valve manual to recenter the valve. If the motor does not move, unplug it and plug it back in.`
    ] },
    { t: `Final flush at every fixture`, why: `This is the step that prevents the "my water is black" phone call.`, steps: [
      `Force 2 regenerations.`,
      `Run water at every fixture in the home for 2 minutes: every faucet, tub, shower and toilet, hot and cold.`,
      `If the water is still cloudy, repeat the forced regenerations and the 2-minute flush at every fixture.`,
      `Remove and rinse faucet aerators and clean any carbon residue off the fixtures.`,
      `Check the system and all your joints for leaks one more time.`,
      `Leave the warranty, the valve manual and the water tips brochure with the homeowner and activate the warranty.`,
      `Show the homeowner the bypass, the display and what a regeneration sounds like, and tell them when it will run.`
    ] },
    S.closeout ],
  checklist: [`System size matches the work order`, `House pressure checked, 25 to 80 PSI`, `Installed after the pressure regulator on the main line`, `Location dry, level and protected from freezing`, `Inlet and outlet correct by the arrow`, `Adapters soldered away from the valve`, `Outlet ball valve and hose bib installed`, `HALO ION conditioner installed in the direction of flow`, `Bonding jumper restored`, `Drain line run to an approved drain through an air gap`, `Plugged into an unswitched 120-volt outlet`, `Tank filled in bypass, no leaks`, `Flushed at the hose bib until clear`, `Forced regeneration run`, `Time, regeneration time and days programmed`, `Two more regenerations forced`, `Every fixture run for 2 minutes`, `Aerators cleaned`, `Warranty, valve manual and water tips left with homeowner`, ...END_CHECK],
  record: [...BASE_RECORD, `System size`, `House water pressure (PSI)`, `Number of people in the home`, `Days between regenerations`, `Regeneration time of day`, `Warranty activated (yes/no)`, ...SIGN_RECORD],
  quiz: [
    { q: `What pressure range is the HALO 5 built for?`, a: [`25 to 80 PSI, best around 60`, `80 to 125 PSI`, `10 to 40 PSI`, `Any pressure`], r: `Unbox, check parts & choose the location` },
    { q: `Where does the system go relative to the pressure regulator?`, a: [`Downstream of it`, `Upstream of it`, `It replaces the regulator`, `It does not matter`], r: `Unbox, check parts & choose the location` },
    { q: `Which water does a HALO 5 treat?`, a: [`All the water entering the home, hot and cold`, `Hot water only`, `Kitchen cold only`, `Irrigation only`], r: `Unbox, check parts & choose the location` },
    { q: `Looking at the back of the control valve, where is the inlet?`, a: [`On the left side of the bypass assembly`, `On the right side`, `On the top`, `On the drain port`], r: `Plumb the system` },
    { q: `What two things are installed on the outlet side?`, a: [`A ball valve and a hose bib`, `A check valve and a gauge`, `A second filter and a union`, `Nothing`], r: `Plumb the system` },
    { q: `What are the outlet ball valve and hose bib for?`, a: [`Flushing the system at start-up without sending carbon into the house`, `Watering the lawn`, `Draining the water heater`, `Testing water hardness`], r: `Charge the system & flush` },
    { q: `What size is the drain outlet on the valve?`, a: [`3/4-inch threaded`, `1/4-inch barb`, `2-inch slip`, `There is no drain`], r: `Drain line & power` },
    { q: `Can the drain line run uphill?`, a: [`Slightly, if it has to. It is under pressure during backwash`, `Never`, `Yes, any height`, `Only with a pump`], r: `Drain line & power` },
    { q: `What position is the bypass in when you first turn the main on?`, a: [`Bypass`, `Service`, `Backwash`, `It does not matter`], r: `Charge the system & flush` },
    { q: `How far do you first open the outlet side of the bypass?`, a: [`Slowly, to halfway, then check for leaks`, `Fully and fast`, `Not at all until the next day`, `One quarter turn and leave it`], r: `Charge the system & flush` },
    { q: `How long do you run the hose bib on the first flush?`, a: [`10 minutes or until consistently clear`, `30 seconds`, `1 minute`, `Until the tank is empty`], r: `Charge the system & flush` },
    { q: `How do you force a regeneration?`, a: [`Press the up and down arrows together until the cycle starts`, `Unplug the valve for 10 minutes`, `Hold SET for 30 seconds`, `Close the main`], r: `Charge the system & flush` },
    { q: `Days between regenerations for a family of five?`, a: [`7`, `9`, `11`, `14`], r: `Program the valve` },
    { q: `Days between regenerations for one person?`, a: [`11`, `7`, `9`, `3`], r: `Program the valve` },
    { q: `Days between regenerations for a couple?`, a: [`9`, `7`, `11`, `5`], r: `Program the valve` },
    { q: `What is the final flush?`, a: [`Force 2 regenerations, then run every fixture for 2 minutes`, `Run the kitchen faucet for 30 seconds`, `Force 1 regeneration and leave`, `Drain the water heater`], r: `Final flush at every fixture` },
    { q: `Water is still cloudy after the final flush. What do you do?`, a: [`Repeat the forced regenerations and the 2-minute flush at every fixture`, `Tell the customer it will clear in a week`, `Put the system in bypass and leave`, `Lower the house pressure`], r: `Final flush at every fixture` },
    { q: `What stays with the homeowner?`, a: [`The warranty, the valve manual and the water tips brochure`, `The shipping box`, `The spare fittings only`, `Nothing`], r: `Final flush at every fixture` },
    { q: `What kind of outlet does the valve need?`, a: [`A grounded 120-volt outlet that is not on a switch`, `A 240-volt outlet`, `Any switched outlet`, `It runs on batteries`], r: `Drain line & power` },
    { q: `Why are the adapters soldered before they are connected to the bypass?`, a: [`To keep torch heat away from the valve and bypass`, `To save solder`, `Because the bypass is brass`, `The guide requires compression fittings`], r: `Plumb the system` }
  ] });
/* ── 12. NUVOH2O HOME & MANOR ───────────────────────────────────── */
M.push({ id: `nuvo`, trade: `plumbing`, art: `nuvo`, title: `NuvoH2O Home & Manor Install`, short: `Nuvo Home / Manor`,
  desc: `NuvoH2O salt-free cartridge softeners, Home and Manor: water checks, wall mount, pressure regulator, three-valve bypass, cartridge start-up and the one-hour soak, following the NuvoH2O installation guides.`,
  expect: [`Read the NuvoH2O installation guide in the box. This SOP follows it, and the guide wins where they differ.`, `The cartridge soaks for a full hour before the system goes into service. Nobody leaves before that hour is up and the system is in service and leak-free.`, `Home and Manor install the same way. The Manor is the larger system: confirm which one the work order calls for before you open the box.`],
  sections: [ S.arrive,
    { t: `Confirm the system & check the water`, why: `A Nuvo is the wrong product on some water. Find that out before it is on the wall.`, steps: [
      `Confirm the box matches the work order: Home or Manor.`,
      `Check the contents: head, sump (housing), cartridge, housing wrench, mounting bracket and screws, O-ring, lubricant, installation guide and warranty card. Fittings and connectors are not included.`,
      `Test the pH of the incoming water. Do not install if the pH is 7.2 or lower. The system is made for hard, alkaline water.`,
      `It is for treated city water. Do not install it on water that is microbiologically unsafe or of unknown quality unless that water is disinfected ahead of it.`,
      `Do not install it behind a salt (ion exchange) softener.`,
      `Check the house pressure with a gauge. Maximum working pressure is 100 PSI on the Home and 125 PSI on the Manor, and the guide calls for a pressure regulator ahead of the system set to 45 to 65 PSI.`,
      `It goes on cold water only. Working water temperature is 39 to 113 degrees F, so it is never installed on a hot line or after the water heater.`,
      `It needs no drain, no electricity, no calibration and no soft-water loop.`
    ], stop: `pH 7.2 or lower, or no way to get a regulator ahead of the system: do not install. Call your manager.` },
    { t: `Choose the location & mount the bracket`, why: `The sump is heavy when it is full and it has to come off every six months. It hangs on studs, with room to work.`, steps: [
      `Install it on the home's main internal water line, after the main shutoff and the pressure regulator, so it treats the whole home.`,
      `Pick a spot protected from freezing and from excessive heat. Insulate any exposed piping that can freeze or get hot.`,
      `Keep it away from electrical appliances, and cover or unplug electrical outlets in the area before you open the water.`,
      `Find the studs with a stud finder and fasten the mounting bracket to them with the screws provided. Use proper anchors on masonry.`,
      `The system mounts vertically with the blue head on top. Never mount it upside down or on its side.`,
      `Leave room underneath to lower the sump for cartridge changes, and room to swing the housing wrench.`,
      `Remove all foam, plastic and loose packing from inside the housing.`
    ] },
    { t: `Plumb the regulator, bypass & connections`, why: `The three-valve bypass is how the cartridge soaks while the house still has water, and how every cartridge change gets done.`, steps: [
      `Turn off the main and drain the line. Verify the water is off.`,
      `Install the pressure regulator ahead of the system and set it to 45 to 65 PSI.`,
      `Build the bypass the way the guide's diagram shows, with three valves: valve A on the inlet side of the system, valve D on the outlet side, and valve C on the bypass line between them.`,
      `Connect supply to the head's inlet and the head's outlet to the house. Follow the markings on the head.`,
      `Make the connections at the head with flexible hoses. The guide requires them; rigid pipe straight into the head leads to leaks.`,
      `Use 3 to 4 wraps of thread seal tape on the threaded connections.`,
      `Keep torch heat away from the plastic head. Solder adapters before they are connected.`,
      `Support the piping so its weight is not hanging on the head.`,
      `If the pipe you cut was part of the home's electrical ground path, restore it with a bonding jumper.`
    ] },
    { t: `Install the cartridge & start up`, why: `The order of the valves matters. Done wrong, the cartridge does not soak or the sump is not purged of air.`, steps: [
      `Lubricate the O-ring with the lubricant provided and seat it at the top of the sump.`,
      `Remove the protective plastic wrap from the cartridge.`,
      `Set the cartridge in the sump with the small round holes facing up, seated straight so it does not crack when the sump is tightened.`,
      `Thread the sump onto the head in the direction the guide shows, then tighten it with the housing wrench provided.`,
      `Loosen the pressure release valve on top of the head with a screwdriver. Loosen it, do not remove it.`,
      `Open valve A to fill the sump. When water comes out of the pressure release valve, tighten the release valve to close it. Do not overtighten.`,
      `Close valve A. Open valve C so the house has water while the cartridge soaks.`,
      `Let the cartridge soak for one full hour. Use the hour for cleanup, photos and paperwork.`,
      `After the hour, close valve C and open valves A and D. Water now runs through the system.`,
      `Check the head, the sump seal, the release valve and every connection for leaks under pressure. If the sump seal weeps, shut off, re-lubricate or replace the O-ring and reseat it.`,
      `Run water at a faucet and confirm full flow.`
    ], stop: `Never leave with valve C still open. A system left in bypass is treating nothing.` },
    { t: `Label, hand over & explain`, why: `This system does nothing when its cartridge is spent. The customer has to know the date.`, steps: [
      `Write the install date and the next cartridge change date on the system. The cartridge is replaced at least every six months, sooner with heavy water use.`,
      `Tell the customer what happens if it is left too long: poor performance, and a housing that can crack and leak.`,
      `Show the customer the three bypass valves and which positions are "in service" and "bypass".`,
      `Explain what to expect: the system binds the minerals instead of removing them, so the water does not feel slippery and a hardness test will still read hard. That is normal.`,
      `Warn them about spent cartridges: the water inside is concentrated and can damage copper, stone, carpet, concrete and flooring. It is drained into a sink or tub, with a bucket and towel under the system during the change.`,
      `Tell them the O-ring is inspected and lubricated at every cartridge change and replaced on the schedule in the guide.`,
      `Leave the installation guide, the housing wrench, the lubricant and the warranty card, and register the warranty the way the office tells you to.`,
      `Offer to put the cartridge changes on our schedule.`
    ] },
    S.closeout ],
  checklist: [`Home or Manor matches the work order`, `Incoming pH tested, above 7.2`, `Not installed behind a salt softener`, `Pressure regulator ahead of the system, set 45 to 65 PSI`, `On the cold main line, before the water heater`, `Location protected from freezing and heat, away from electrical`, `Bracket fastened to studs`, `Mounted vertical, blue head on top`, `Room below to remove the sump`, `Three-valve bypass (A, C, D) installed`, `Flexible hoses at the head`, `No torch heat on the head, piping supported`, `O-ring lubricated and seated`, `Cartridge unwrapped, holes facing up`, `Sump tightened with the housing wrench`, `Air purged at the pressure release valve`, `Cartridge soaked one full hour`, `Valve C closed, valves A and D open`, `No leaks under pressure`, `Install date and next change date written on the system`, `Customer shown the bypass and told about six-month changes`, `Guide, wrench, lubricant and warranty card left`, ...END_CHECK],
  record: [...BASE_RECORD, `System: Home or Manor`, `Incoming water pH`, `House pressure before and regulator setting (PSI)`, `Soak start and end time`, `Install date and next cartridge change date`, `Warranty registered (yes/no)`, ...SIGN_RECORD],
  quiz: [
    { q: `At what incoming pH do you NOT install a NuvoH2O system?`, a: [`7.2 or lower`, `8.5 or higher`, `Anything above 7.5`, `pH does not matter`], r: `Confirm the system & check the water` },
    { q: `What does the guide call for ahead of the system?`, a: [`A pressure regulator set to 45 to 65 PSI`, `A check valve set to 100 PSI`, `A sediment trap`, `A booster pump`], r: `Confirm the system & check the water` },
    { q: `Can a Nuvo go downstream of a salt (ion exchange) softener?`, a: [`No`, `Yes, that is the preferred location`, `Yes, if the softener is in bypass`, `Only the Manor`], r: `Confirm the system & check the water` },
    { q: `Which line does it go on?`, a: [`The cold main line, before the water heater`, `The hot outlet of the water heater`, `The recirculation line`, `The irrigation line`], r: `Confirm the system & check the water` },
    { q: `Which of these does a Nuvo system need?`, a: [`None of them: no drain, no electricity, no soft-water loop`, `A drain line with an air gap`, `A 120-volt outlet`, `A soft-water loop`], r: `Confirm the system & check the water` },
    { q: `How is the system oriented?`, a: [`Vertical, blue head on top, never inverted`, `Horizontal, head to the left`, `Upside down so the sump drains`, `Any way that fits`], r: `Choose the location & mount the bracket` },
    { q: `What is the mounting bracket fastened to?`, a: [`Wall studs, found with a stud finder`, `Drywall, with the screws provided`, `The water pipe itself`, `Nothing, the piping holds it`], r: `Choose the location & mount the bracket` },
    { q: `Why leave room under the system?`, a: [`To lower the sump for cartridge changes`, `For the drain line`, `For airflow`, `For the power cord`], r: `Choose the location & mount the bracket` },
    { q: `How many valves are in the bypass, and where?`, a: [`Three: A on the inlet, D on the outlet, C on the bypass line`, `One, on the inlet`, `Two, both on the outlet`, `None, the head has a built-in bypass`], r: `Plumb the regulator, bypass & connections` },
    { q: `How are the connections made at the head?`, a: [`With flexible hoses`, `Rigid copper soldered at the head`, `Glued PVC`, `Garden hose fittings`], r: `Plumb the regulator, bypass & connections` },
    { q: `Which way does the cartridge go in the sump?`, a: [`Small round holes facing up, plastic wrap removed`, `Holes facing down`, `Either way`, `With the plastic wrap left on`], r: `Install the cartridge & start up` },
    { q: `What do you do with the pressure release valve before filling?`, a: [`Loosen it with a screwdriver, without removing it`, `Remove it completely`, `Tighten it as far as it goes`, `Nothing`], r: `Install the cartridge & start up` },
    { q: `When do you tighten the pressure release valve?`, a: [`When water comes out of it as the sump fills`, `Before opening valve A`, `After the one-hour soak`, `Never, it stays loose`], r: `Install the cartridge & start up` },
    { q: `How long does the cartridge soak before the system goes into service?`, a: [`One full hour`, `5 minutes`, `15 minutes`, `Overnight`], r: `Install the cartridge & start up` },
    { q: `What are the valve positions during the soak?`, a: [`A closed, C open so the house has water`, `A, C and D all open`, `A and D open, C closed`, `All three closed`], r: `Install the cartridge & start up` },
    { q: `What are the valve positions when the system is in service?`, a: [`C closed, A and D open`, `C open, A and D closed`, `All three open`, `Only A open`], r: `Install the cartridge & start up` },
    { q: `How is the sump tightened?`, a: [`Threaded on the way the guide shows, then tightened with the housing wrench provided`, `Hand tight only`, `With a pipe wrench until it stops`, `With thread seal tape on the sump threads`], r: `Install the cartridge & start up` },
    { q: `How often is the cartridge replaced?`, a: [`At least every six months, sooner with heavy use`, `Every five years`, `Only when the water tastes different`, `Never, it is permanent`], r: `Label, hand over & explain` },
    { q: `The customer's test strip still reads "hard" after the install. What do you tell them?`, a: [`That is normal: the system binds the minerals instead of removing them`, `The cartridge is defective`, `The system needs a regeneration`, `They need to add salt`], r: `Label, hand over & explain` },
    { q: `Why are a bucket and towel used at a cartridge change?`, a: [`The water in a spent cartridge is concentrated and can damage copper, stone, carpet and flooring`, `To catch salt`, `To measure the water used`, `They are not needed`], r: `Label, hand over & explain` }
  ] });
})();
