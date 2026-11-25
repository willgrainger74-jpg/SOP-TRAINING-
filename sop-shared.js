/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — shared SOP building blocks (sop-shared.js)

   Sections and question pools that more than one module uses.
   Edit the wording here and every module that uses it updates.
   Section = { t: title, why: one line, steps: [...], stop: 'stop-work rule', tools: [...] }
   Question = { q, a: [CORRECT answer first, then three wrong ones], r: 'what to review' }
   (answers are shuffled every time a test is taken)
   ═══════════════════════════════════════════════════════════════════ */
window.SOP = { modules: [], pools: {}, S: {} };
(function () {
const S = window.SOP.S;

/* ── every job ─────────────────────────────────────────────────── */
window.SOP.expect = [
  `Follow the SOP on every install. No step is skipped to save time.`,
  `The manufacturer's installation manual and local code win whenever they are stricter than this SOP. Read the manual that ships with the equipment.`,
  `Show up on time, in uniform, with a clean and stocked truck.`,
  `Protect the customer's home: shoe covers, drop cloths, and nothing left damaged or dirty.`,
  `Take before and after photos and write down every reading the SOP asks for.`,
  `Stop work and call your manager when something is unsafe, damaged, or not what the work order says.`,
  `The lead installer owns the quality of the whole job, including the helper's work.`,
  `No job is finished until the equipment has been tested running and the customer has been walked through it.`
];

S.arrive = { t: `Before you start`, why: `Most callbacks start with something that was missed in the first fifteen minutes.`, steps: [
  `Read the work order before you leave the shop: model numbers, accessories, permit, and anything the salesperson promised the customer.`,
  `Load the truck from the job's material list. Check the new equipment for shipping damage and confirm the model numbers match the work order before the old equipment comes out.`,
  `Park so the customer is not blocked in, and keep oil and debris off the driveway.`,
  `Introduce yourself and your helper at the door. Walk the job with the customer: what is being installed, where, about how long, and what will be shut off.`,
  `Put on shoe covers. Lay drop cloths or floor protection from the door to the work area and move or cover the customer's belongings.`,
  `Take "before" photos: the existing equipment, its data plate, the work area, and any damage that is already there on floors, walls, ceilings or the yard.`,
  `Look for hazards before you touch anything: gas, live electrical, attic or roof access, water damage, mold, and old duct wrap or flue pipe that could be asbestos. Call your manager before disturbing anything that looks like asbestos.`,
  `Find the power, gas and water shutoffs for the job and confirm they work.`,
  `Wear safety glasses and gloves. Add hearing, respiratory and fall protection when the task calls for it.`
], stop: `Wrong equipment, damaged equipment, or a job that does not match the work order: stop and call your manager before removing anything.` };

S.closeout = { t: `Clean up, document & customer walkthrough`, why: `The customer judges the whole job by the last ten minutes.`, steps: [
  `Remove the old equipment, boxes, scrap and trash. Sweep or vacuum the work area and wipe down the new equipment. Leave it cleaner than you found it.`,
  `Take "after" photos: the full installation, the data plate with model and serial, every connection you made (gas, vent, electrical, drain, piping), and your test readings.`,
  `Record the model numbers, serial numbers and all test readings on the job.`,
  `Put the Action sticker on the equipment and leave the owner's manual and warranty paperwork with the customer. Register the warranty the way the office tells you to.`,
  `Walk the customer through the job: show the equipment running, the shutoffs, the thermostat or controls, and the maintenance they are responsible for.`,
  `Ask if they have any questions and if they are completely satisfied. Fix anything they point out before you leave.`,
  `Ask for the review.`,
  `Call or text dispatch before you pull away: job done, what was installed, and anything the office needs to know.`,
  `Log the job in the Install Tracker the same day.`
] };

/* ── refrigerant circuit (company SOP) ─────────────────────────── */
S.a2l = { t: `Refrigerant type & R-32 (A2L) rules`, why: `The Goodman equipment we install is approved for R-32 only. R-32 is mildly flammable (A2L) and is handled differently from R-410A.`, steps: [
  `Read the nameplate on both the old and new equipment. Know which refrigerant you are recovering and that the new unit is R-32.`,
  `Never mix refrigerants and never charge a Goodman R-32 unit with anything but R-32.`,
  `Use a recovery machine, vacuum pump and leak detector that are rated for A2L refrigerants. Check the work area with the detector before and during the work.`,
  `Recover only into a cylinder labeled for R-32, and never fill a cylinder past 80 percent. A2L cylinders have a red band or top and a left-hand thread.`,
  `Keep flames and ignition sources away while refrigerant is present. Ventilate the area before you open the system, keep a dry-powder or CO2 extinguisher at hand for hot work, and recover all refrigerant before you heat a joint on a system that has held a charge.`,
  `Check the minimum room area (Amin) on the unit's serial plate and multiply it by the altitude factor in the manual. Utah jobs always need the altitude adjustment.`,
  `Line set joints are brazed, or made with mechanical fittings Goodman approves for R-32. Keep joints out of the run wherever you can.`,
  `The indoor coil has a refrigerant detection sensor. Mount and wire it as the coil's manual shows. On a Goodman furnace, confirm the R-32 function on the control board is set for the system, and power any accessory that could be an ignition source (an electronic air cleaner, for example) only through the accessory control board kit.`,
  `An existing line set is reused only when it is the size Goodman calls for and undamaged. Drain the residual oil, flush it with an approved flushing agent, purge it with nitrogen and pressure-test it.`,
  `Ground the unit before charging, and write the factory, field and total charge on the unit's charge label.`
], stop: `If you do not have A2L-rated recovery equipment on the truck, do not start the refrigerant work.` };

S.recover = { t: `Recover refrigerant & disconnect existing equipment`, why: `Refrigerant is never vented. The old system is empty and dead before a line is cut.`, steps: [
  `Shut off power to the system at the disconnect and verify it is off with a meter.`,
  `Recover all refrigerant with an approved recovery machine into an approved recovery cylinder on a scale.`,
  `Verify the refrigerant is recovered before opening the system.`,
  `Disconnect and remove the existing outdoor unit.`,
  `Cut and disconnect the existing evaporator coil and refrigerant lines as needed.`,
  `Expose both the high-side and low-side refrigerant lines for flushing.`,
  `Prepare the line set for cleaning.`
], tools: [`Refrigerant recovery machine`, `Approved recovery cylinder`, `Refrigerant scale`, `Cutting tools`, `PPE`, `Nitrogen cylinder and regulator`, `Approved refrigerant-line flush kit`] };

S.flush = { t: `Flush the refrigerant lines (two-man operation)`, why: `Removes oil, contaminants and debris from the existing lines before the new equipment is connected. This step takes two technicians, no exceptions.`, steps: [
  `Confirm the lines are disconnected from both the indoor coil and the outdoor unit.`,
  `Position the lines so the flush drains downhill, and identify the high-side and low-side lines.`,
  `Stage the nitrogen cylinder, regulator, approved flush kit, PPE and collection bucket. Confirm the flushing solution is approved for the application.`,
  `Secure the receiving end and direct it into the collection bucket.`,
  `Lead technician controls the flush. Helper stays at the receiving end, watches the discharge and calls out what is coming out.`,
  `Mandatory callout before every flush. Lead: "Flush is about to start. Are you ready?" Helper: "Ready. Bucket is in position. Start the flush." Lead: "Flush starting."`,
  `Flush the first line with the approved kit, in the direction that drains downhill, with all discharge going into the bucket.`,
  `Purge with nitrogen, using the approved procedure, to clear the remaining flush and contaminants.`,
  `Continue until the discharge is clean, clear and free of flush, then verify the line is dry.`,
  `Repeat for the second line. Do not move on until both lines are cleaned and verified.`
], stop: `Never block a refrigerant line with your thumb while nitrogen pressure is applied. Use rated fittings, valves and plugs. Uncontrolled pressure can drive debris and liquid into your face and eyes.` };

S.braze = { t: `Braze with nitrogen & protect components`, why: `Brazing without nitrogen makes copper oxide scale inside the pipe. It travels through the circuit and clogs the filter-drier, TXV or metering device.`, steps: [
  `Verify the lines are clean and dry from the flush.`,
  `Install the new liquid-line filter-drier last, and leave it sealed until just before you braze it in.`,
  `Remove the Schrader cores from the service valves before brazing.`,
  `Set up a regulated nitrogen flow through the piping before you light the torch.`,
  `Confirm nitrogen is flowing through the line being brazed and keep it flowing through every brazing operation.`,
  `Braze all refrigerant connections with a brazing alloy of at least 5 percent silver. Do not use flux.`,
  `Protect service valves, TXVs and other heat-sensitive parts with wet rags or approved heat protection, and keep them on until the joint cools.`,
  `Let joints and components cool before handling, then inspect every brazed joint.`,
  `Once the lines have cooled, install the Schrader access valves and cores where required.`
], stop: `No nitrogen flow during brazing means stop work. Do not continue.` };

S.pressure = { t: `Pressure test the refrigerant system`, why: `A leak means lost refrigerant, poor operation and equipment damage. The system holds nitrogen before it moves on.`, steps: [
  `Confirm all brazed connections are complete and cooled.`,
  `Connect the pressure-testing equipment with a regulator and properly rated hoses, gauges and fittings. The nitrogen regulator must have a relief valve set at 450 PSIG or less.`,
  `Pressurize slowly with dry nitrogen only. Never use oxygen, compressed air or refrigerant.`,
  `Test at 450 PSIG, and never above the maximum allowable pressure on the unit's serial plate.`,
  `Close the nitrogen supply once the target pressure is reached.`,
  `Check all brazed joints, service connections, Schrader cores and accessible fittings with soap solution.`,
  `Hold the pressure for at least 15 minutes, the minimum in Goodman's instructions. The system passes only if the pressure does not drop.`,
  `If the pressure drops: stop, find the leak, repair it and repeat the whole test. Temperature swings move the gauge, so check temperature and check for leaks before calling it a pass.`,
  `After a pass, release the nitrogen in a controlled manner without letting air or moisture into the system, and get ready to evacuate.`
], stop: `A failed pressure test is never "close enough". Repair and retest.` };

S.vacuum = { t: `Evacuate & run the vacuum decay test`, why: `Proves the system is dry and tight before refrigerant goes in.`, steps: [
  `Connect a vacuum pump rated for 500 microns or lower to both service valves, with hoses suited to deep evacuation. Removing the Schrader cores speeds it up.`,
  `Place a dedicated micron gauge where it reads the system, not the pump.`,
  `Pull the system down below 500 microns. Never use the compressor to evacuate the system.`,
  `Isolate the system from the vacuum pump with the proper valve arrangement.`,
  `Watch the micron gauge for at least 10 minutes.`,
  `Pass: the reading holds steady at 1,000 microns or less.`,
  `Holds steady between 1,000 and 2,000 microns: there is moisture, air or a small leak. Evacuate again. If it repeats, find and repair the leak.`,
  `Rises above 2,000 microns: there is a leak. Repair it and start the evacuation over.`,
  `Repeat the evacuation and the decay test until the system passes.`
], stop: `Do not release refrigerant into a system that failed the decay test.` };

S.release = { t: `Release refrigerant, charge & start up`, why: `Refrigerant is released only after the pressure test and the vacuum decay test have both passed.`, steps: [
  `Confirm the pressure test passed and the 500-micron evacuation and 10-minute decay test passed.`,
  `Open the liquid service valve first. After the charge has bled into the system, open the suction valve.`,
  `These are not back-seating valves. On a valve with a retainer, open it only until the top of the stem is 1/8 inch from the retainer, and never force it.`,
  `Put a drop of refrigerant oil on the cap threads and tighten the valve caps finger-tight plus 1/6 turn.`,
  `Verify all electrical connections, the thermostat setup, and that the indoor blower and outdoor fan are ready to run.`,
  `Verify airflow before you touch the charge: correct blower setting and total external static of 0.5 in. w.c. or less.`,
  `The factory charge covers the matched coil and 15 feet of line set. Weigh in the extra refrigerant for a longer line set from the per-foot table in the manual.`,
  `Check the final charge only when it is 60 degrees F or warmer outside. Run the system in cooling 10 to 15 minutes to stabilize first.`,
  `TXV coil: charge by subcooling to 8 degrees F, plus or minus 1. Fixed orifice (piston): charge by superheat from the table in the manual for the outdoor and indoor conditions.`,
  `Use the equipment's own target values and never charge on suction pressure alone.`,
  `Record operating pressures, temperatures, subcooling, superheat and electrical readings, and fill in the charge label.`
] };

/* ── outdoor & indoor sides of a split system ──────────────────── */
S.outdoor = { t: `Set the outdoor unit, electrical & line set`, why: `A unit that is not level, is boxed in, or is wired wrong fails early.`, steps: [
  `Set the unit on a solid, level pad above grade.`,
  `Keep Goodman's clearances: at least 10 inches on the sides, 18 inches on the service side, 20 inches between two units and 60 inches above. Avoid corners, decks and anywhere hot air recirculates or leaked refrigerant could pool.`,
  `The disconnect is within sight of the unit and easy to reach, not behind it and not mounted on the unit.`,
  `Breaker or fuse is no larger than the maximum overcurrent protection on the nameplate. Wire is copper, no smaller than the minimum circuit ampacity calls for.`,
  `Use a new liquid-tight whip. Tighten every lug and bond the ground.`,
  `Protect the low-voltage wire and make its splices weatherproof.`,
  `Use refrigerant-grade copper sized from Goodman's table. A run over 79 feet, or a lift over 50 feet, falls under Goodman's long-line guidelines: call your manager.`,
  `Insulate the suction line for its full length with at least 3/8-inch-wall insulation. Support the lines, keep them off framing and ductwork, avoid kinks, and sleeve and seal the wall penetration.`
] };

S.coil = { t: `Indoor coil, condensate & airflow`, why: `Most water-damage callbacks come from the drain, and most performance complaints come from airflow.`, steps: [
  `Confirm the coil is the matched R-32 coil for the outdoor unit and has the TXV or piston the outdoor unit's instructions call for. The outdoor unit decides the metering device, not the coil.`,
  `Set the coil level or pitched the way the manual shows, and seal the coil case to the furnace or air handler.`,
  `Clamp the TXV sensing bulb on clean suction line in the position the manual shows, and insulate it.`,
  `Primary drain: 3/4 inch minimum, trapped the way the manufacturer shows, sloped 1/4 inch per foot, run to an approved location.`,
  `In an attic or above a finished ceiling, install a secondary drain pan under the unit with its own drain or a float switch that shuts off cooling.`,
  `Lift the float switch and confirm it stops the system.`,
  `Pour water into the pan and watch it drain before you leave.`,
  `Set the blower for the airflow in the manufacturer's table, about 400 CFM per ton unless the manual says otherwise. Total external static must be 0.5 in. w.c. or less.`,
  `Install a new, clean filter of the correct size with the arrow pointing at the blower.`
] };

/* ── gas furnace blocks ────────────────────────────────────────── */
S.furnRemove = { t: `Shut down & remove the old furnace`, why: `Power and gas are off and proven off before anything is disconnected.`, steps: [
  `Turn the thermostat off. Shut off power at the switch or breaker and verify it is off with a meter.`,
  `Close the gas shutoff at the furnace, disconnect the gas line and cap it while you work.`,
  `If the AC coil is being replaced, recover the refrigerant first. If it is staying, protect it.`,
  `Take a photo of the thermostat wiring, then disconnect the wiring, the vent and the duct connections.`,
  `Remove the furnace without damaging floors or walls.`,
  `Inspect the plenum, return, platform and floor for rust, water damage or signs of flue gas leakage.`,
  `Check the existing duct sizes against what the new furnace needs before you set it.`
] };

S.furnSet = { t: `Set the furnace & connect the ductwork`, why: `Duct leaks and bad returns cause high temperature rise, noise and comfort complaints.`, steps: [
  `Confirm the furnace is approved for the position you are installing it in (upflow, horizontal, downflow) and convert it the way the manual shows.`,
  `Set it on a solid, level base. In a garage, keep the burners and ignition source 18 inches above the floor where code requires it and protect the furnace from vehicles.`,
  `In an attic or crawl space, provide the platform, working space, light and service access that code requires.`,
  `Keep the clearances to combustibles listed on the nameplate, and leave 24 inches in front for service. Do not set the furnace directly on carpet or tile, and never on its back. A downflow furnace on a combustible floor needs the manufacturer's sub-base.`,
  `Connect the supply plenum and return with sheet-metal transitions. Screw every joint and seal it with mastic or UL 181 foil tape.`,
  `Seal the return completely, including unused side and bottom openings. Never pull return air from a garage or from a closet that holds a fuel-burning appliance, and never use a room or closet as the return.`,
  `Never connect the return to the back of a Goodman furnace. Airflow over 1,800 CFM needs a bottom return or returns on two sides.`,
  `Install a filter rack with a cover that the customer can reach, and the correct size filter with the arrow toward the blower.`,
  `Set the evaporator coil on the supply side, level, sealed to the furnace, with its drain trapped and sloped.`
] };

S.gas = { t: `Gas piping`, why: `Every joint you touch is leak-tested with gas pressure on it.`, steps: [
  `Confirm the appliance is set up for the fuel on site. LP needs the manufacturer's conversion kit, installed and labeled.`,
  `Install the gas shutoff valve in the same room, within 6 feet of the appliance, ahead of the union.`,
  `Install a sediment trap (drip leg) as close to the appliance inlet as practical: a tee with a capped nipple, at least 3 inches long, at the bottom of a vertical drop.`,
  `Install a union between the shutoff and the gas valve. Run rigid pipe through the cabinet wall, not a flexible connector.`,
  `Use sealant rated for gas on the male threads only and keep it off the first two threads.`,
  `Hold the gas valve with a backup wrench while you tighten into it, and support the gas line so it does not load the valve.`,
  `Confirm the gas line size and the meter can carry this appliance plus everything else on the line.`,
  `Turn the gas on and leak-test every joint you touched with leak-detection solution or an electronic detector. Never use a flame.`,
  `For a pressure test of the piping above 1/2 PSI, disconnect the appliance and its shutoff from the line. At 1/2 PSI or less, close the appliance shutoff.`
], stop: `Smell gas or find a leak you cannot fix: shut the gas off, ventilate, and call your manager.` };

S.furnElec = { t: `Electrical, thermostat & controls`, why: `Bad polarity or a weak ground causes flame-sensing lockouts that show up as "no heat" calls.`, steps: [
  `Supply a separate 115-volt branch circuit sized to the nameplate, with a disconnect at the furnace.`,
  `Verify polarity and ground with a meter: hot to L1, neutral to neutral, a solid ground. Goodman's check: resistance from neutral to a burner is 10 ohms or less. Conduit and gas pipe are not a ground.`,
  `Land thermostat wires on the correct terminals with proper connectors. No bare copper showing, and keep wires off hot surfaces and sharp edges.`,
  `Set the blower speed taps or dip switches for heating temperature rise and for cooling airflow, per the manual.`,
  `Mount the thermostat level and configure it for the equipment: fuel type, number of stages, fan control.`,
  `Wire the condensate safety switch so it shuts the equipment off.`,
  `Confirm the blower door switch kills the furnace when the door is off.`
] };

S.furnStart = { t: `Startup, gas pressure & combustion testing`, why: `A furnace is not installed until it has been measured running.`, steps: [
  `Purge the air from the gas line the way code allows, never into the combustion chamber.`,
  `Measure inlet gas pressure with a manometer while the furnace is firing and the other gas appliances are running. Goodman's range is 4.5 to 10.0 in. w.c. on natural gas and 11.0 to 13.0 in. w.c. on LP.`,
  `Set manifold pressure to the nameplate value: 3.5 in. w.c. on natural gas (3.2 to 3.8 allowed) and 10.0 in. w.c. on LP (9.7 to 10.3). Never derate a furnace by turning the manifold pressure down.`,
  `High altitude: Utah and northern Arizona jobs are high-altitude jobs. Look up the job's elevation and use the altitude table in the Goodman manual for that model to see whether an orifice and pressure-switch kit is required. Do not guess.`,
  `Watch three full ignition cycles: inducer, pressure switch, igniter, flame, blower. The flame is steady and blue and does not lift, roll out or change when the blower starts.`,
  `Measure temperature rise after 10 minutes of steady firing: supply air minus return air, with the supply probe out of line-of-sight of the heat exchanger. It must be inside the nameplate range. Change blower speed if it is not. Return air must be between 55 and 100 degrees F while heating.`,
  `Measure total external static pressure and record it. It must not exceed the nameplate maximum, commonly 0.5 in. w.c.`,
  `Run a combustion analysis in the flue and record O2, CO and stack temperature. CO must be stable and under 100 ppm air-free.`,
  `Test the safeties: high limit, rollout, pressure switch, flame sensor and door switch.`,
  `Check for CO in the living space and confirm the home has a working CO alarm. Tell the customer if it does not.`,
  `Cycle the system from the thermostat in heat, fan, and cool if there is AC.`
], stop: `Rising CO, flame rollout, or a flame that moves when the blower starts: shut the furnace down and call your manager. Do not leave it running.` };

/* ── shared question pools ─────────────────────────────────────── */
window.SOP.pools.ref = [
  { q: `How many technicians does the SOP require for flushing refrigerant lines?`, a: [`Two, with no exceptions`, `One, if the line set is under 25 feet`, `One lead, with a helper only on two-story homes`, `Two on the first line, one on the second`], r: `Flush the refrigerant lines` },
  { q: `Before the lead starts a flush, what has to happen?`, a: [`The helper confirms out loud that he is ready and the bucket is in position`, `The helper gives a thumbs-up from the receiving end`, `The lead counts down from three and starts`, `The helper opens the nitrogen regulator`], r: `Flush the refrigerant lines` },
  { q: `Which direction do you flush a refrigerant line?`, a: [`The direction that lets the flush drain downhill into the bucket`, `Always from the outdoor end toward the indoor end`, `Always from the indoor end toward the outdoor end`, `Uphill, so the flush stays in the line longer`], r: `Flush the refrigerant lines` },
  { q: `A tech blocks the open end of a line with his thumb while nitrogen is applied, to "build pressure". What does the SOP say?`, a: [`Never do it. Use rated fittings, valves and plugs`, `It is fine below 150 PSI`, `It is fine as long as he wears gloves`, `Only the lead is allowed to do it`], r: `Flush the refrigerant lines` },
  { q: `Why does nitrogen have to flow through the pipe while you braze?`, a: [`It stops copper oxide scale from forming inside the pipe`, `It cools the joint so the rod flows better`, `It pressure-tests the joint while you braze it`, `It keeps the flame from blowing out`], r: `Braze with nitrogen` },
  { q: `Halfway through a braze you notice the nitrogen cylinder is empty. What do you do?`, a: [`Stop work and do not continue until nitrogen is flowing again`, `Finish that joint, then swap the cylinder`, `Finish all the joints and flush the lines again afterward`, `Keep going and install a larger filter-drier`], r: `Braze with nitrogen` },
  { q: `What are the wet rags on the service valves and TXV for?`, a: [`Protecting heat-sensitive parts from brazing heat`, `Catching flux and solder drips`, `Checking the joint for leaks as it cools`, `Keeping moisture out of the system`], r: `Braze with nitrogen` },
  { q: `When do the Schrader cores go in?`, a: [`After the brazed lines have cooled`, `Before brazing, so the system is sealed`, `After the vacuum decay test`, `Only after the refrigerant is released`], r: `Braze with nitrogen` },
  { q: `What gas is used for the pressure test?`, a: [`Dry nitrogen only`, `Compressed air`, `Nitrogen with a full charge of refrigerant`, `Oxygen from the torch kit`], r: `Pressure test` },
  { q: `What is the test pressure, and what limits it?`, a: [`450 PSIG, and never above the maximum allowable pressure on the serial plate`, `600 PSIG on every system`, `150 PSIG so the coil is not damaged`, `Whatever the nitrogen cylinder has left`], r: `Pressure test` },
  { q: `How long is the nitrogen pressure test held?`, a: [`At least 15 minutes with no pressure drop`, `2 minutes`, `5 minutes`, `Until the joints are cool to the touch`], r: `Pressure test` },
  { q: `The gauge drops 12 PSI during the pressure test and you cannot explain it by temperature. What is next?`, a: [`Stop, find the leak, repair it and repeat the whole test`, `Top the nitrogen back up and finish the 10 minutes`, `Move on to evacuation and see if the vacuum holds`, `Record the final pressure and note it on the job`], r: `Pressure test` },
  { q: `After the pressure test passes, how is the nitrogen removed?`, a: [`Released in a controlled manner without letting air or moisture in`, `Left in the system until the refrigerant pushes it out`, `Dumped by cutting the service port cap`, `Pulled out through the vacuum pump at full pressure`], r: `Pressure test` },
  { q: `What vacuum level must the system reach before the decay test?`, a: [`500 microns or lower`, `1,000 microns or lower`, `1,500 microns or lower`, `29 inches of mercury on the manifold gauge`], r: `Vacuum decay test` },
  { q: `Where does the micron gauge go?`, a: [`Where it reads the system, not the pump`, `On the vacuum pump inlet`, `On the manifold's center hose`, `Anywhere, the reading is the same`], r: `Vacuum decay test` },
  { q: `What is a passing vacuum decay test?`, a: [`Isolated from the pump for 10 minutes, the reading holds steady at 1,000 microns or less`, `The pump runs for 10 minutes and holds 500 microns`, `Isolated for 5 minutes, the reading stays below 2,000 microns`, `The reading rises steadily but slowly for 10 minutes`], r: `Vacuum decay test` },
  { q: `During the decay test the reading passes 1,400 microns and is still climbing. What do you do?`, a: [`Do not release refrigerant. Check for leaks or moisture, evacuate again and retest`, `Release the refrigerant, since it started at 500 microns`, `Run the pump another 5 minutes and release`, `Add a little refrigerant to break the vacuum, then charge`], r: `Vacuum decay test` },
  { q: `When may refrigerant be released into the system?`, a: [`Only after both the pressure test and the vacuum decay test have passed`, `As soon as the pressure test passes`, `As soon as the system reaches 500 microns`, `Once the lines are brazed and cooled`], r: `Release refrigerant, charge & start up` },
  { q: `How is a Goodman TXV system charged?`, a: [`By subcooling, to 8 degrees F plus or minus 1`, `By superheat, to a generic 10 degree target`, `By suction pressure on the gauge`, `By feel of the suction line`], r: `Release refrigerant, charge & start up` },
  { q: `What has to be verified before you adjust the charge?`, a: [`Airflow and operating conditions`, `That the customer has signed the invoice`, `That the thermostat is set to 68 degrees`, `That the outdoor unit has run for 60 seconds`], r: `Release refrigerant, charge & start up` },
  { q: `Which service valve is opened first on a Goodman unit?`, a: [`The liquid valve; the suction valve is opened after the charge has bled in`, `The suction valve, then the liquid valve`, `Both at the same time, quickly`, `Neither until the compressor is running`], r: `Release refrigerant, charge & start up` },
  { q: `How far is a service valve with a retainer opened?`, a: [`Until the top of the stem is 1/8 inch from the retainer, never forced`, `Until it back-seats hard`, `One full turn`, `Half way`], r: `Release refrigerant, charge & start up` },
  { q: `The reading holds steady at 1,600 microns during the decay test. What does that mean?`, a: [`Moisture, air or a small leak: evacuate again, and find the leak if it repeats`, `A pass`, `A large leak: recover and re-braze everything`, `The micron gauge is broken`], r: `Vacuum decay test` },
  { q: `What is the lowest outdoor temperature for checking the final charge in cooling?`, a: [`60 degrees F`, `32 degrees F`, `45 degrees F`, `85 degrees F`], r: `Release refrigerant, charge & start up` },
  { q: `How much line set does the factory charge cover?`, a: [`15 feet; extra length is weighed in from the per-foot table`, `50 feet`, `Any length up to 79 feet`, `None, the unit ships empty`], r: `Release refrigerant, charge & start up` },
  { q: `What brazing alloy does Goodman call for on refrigerant joints?`, a: [`At least 5 percent silver, with no flux`, `Soft solder with flux`, `Any rod, with flux`, `50 percent silver with acid flux`], r: `Braze with nitrogen` },
  { q: `When does the new liquid-line filter-drier get unsealed?`, a: [`Just before it is brazed in, and it is installed last`, `At the start of the job so it can air out`, `After the pressure test`, `It does not matter`], r: `Braze with nitrogen` }
];

window.SOP.pools.gas = [
  { q: `How do you leak-test a gas joint?`, a: [`Leak-detection solution or an electronic detector, with gas pressure on`, `A lighter passed along the joint`, `By smell alone`, `By watching the gas meter for one minute`], r: `Gas piping` },
  { q: `Where does the sediment trap go?`, a: [`As close to the appliance inlet as practical, at the bottom of a vertical drop`, `At the gas meter`, `On the horizontal run, anywhere before the shutoff`, `Inside the appliance cabinet`], r: `Gas piping` },
  { q: `Where is the gas shutoff valve installed?`, a: [`In the same room, within 6 feet of the appliance, ahead of the union`, `Anywhere on the branch line`, `Inside the cabinet, after the union`, `Only at the meter`], r: `Gas piping` },
  { q: `Why do you hold the gas valve with a backup wrench?`, a: [`So tightening the pipe does not twist or damage the valve`, `To keep the valve from turning on`, `To ground the valve`, `It is only needed on LP`], r: `Gas piping` },
  { q: `The job is on LP and the appliance shipped set up for natural gas. What is required?`, a: [`The manufacturer's conversion kit, installed and labeled`, `Turn the manifold pressure up to 10 in. w.c.`, `Drill the existing orifices one size smaller`, `Nothing, modern gas valves adjust themselves`], r: `Gas piping` },
  { q: `When do you measure inlet gas pressure?`, a: [`With the appliance firing and the other gas appliances running`, `With everything off, for a true static reading`, `Before the gas is turned on`, `Only if the customer complains`], r: `combustion testing` },
  { q: `What is the natural gas manifold pressure on a Goodman furnace?`, a: [`3.5 in. w.c., with 3.2 to 3.8 allowed`, `7 in. w.c.`, `10 in. w.c.`, `0.5 in. w.c.`], r: `combustion testing` },
  { q: `What is temperature rise?`, a: [`Supply air temperature minus return air temperature`, `Flue temperature minus room temperature`, `Outdoor temperature minus indoor temperature`, `Supply temperature minus outdoor temperature`], r: `combustion testing` },
  { q: `Temperature rise is above the nameplate range. What is the likely cause and fix?`, a: [`Airflow is too low: raise blower speed and check the filter and ducts`, `Airflow is too high: lower the blower speed`, `Gas pressure is too low: raise the manifold pressure`, `The thermostat is set too high`], r: `combustion testing` },
  { q: `Where is the supply probe placed for a temperature-rise reading?`, a: [`In the supply, out of line-of-sight of the heat exchanger`, `Directly above the heat exchanger`, `At the farthest register`, `In the flue pipe`], r: `combustion testing` },
  { q: `What is the company standard for CO in the flue?`, a: [`Stable and under 100 ppm air-free`, `Under 400 ppm and rising slowly`, `Under 1,000 ppm`, `Any reading, as long as O2 is above 5 percent`], r: `combustion testing` },
  { q: `The burner flame wavers and changes shape the moment the blower starts. What do you do?`, a: [`Shut the furnace down and call your manager`, `Lower the blower speed until it stops`, `Raise the gas pressure`, `Nothing, that is normal on new furnaces`], r: `combustion testing` },
  { q: `A furnace keeps losing flame signal and locking out. Which wiring problem is a common cause?`, a: [`Reversed polarity or a poor ground`, `Thermostat wire that is too long`, `A 20-amp breaker instead of a 15`, `The door switch wired in series`], r: `Electrical, thermostat & controls` },
  { q: `The job is at high elevation. What does the SOP say?`, a: [`Look up the elevation and use the altitude table in the Goodman manual for that model`, `Nothing ever changes with altitude`, `Turn the manifold pressure down by half an inch`, `Use the LP orifices`], r: `combustion testing` },
  { q: `Where must return air never be pulled from?`, a: [`A garage or a closet that holds a fuel-burning appliance`, `A hallway`, `A finished basement`, `A room with a ceiling fan`], r: `Set the furnace & connect the ductwork` },
  { q: `What inlet gas pressure range does Goodman give for natural gas?`, a: [`4.5 to 10.0 in. w.c.`, `1 to 3 in. w.c.`, `11 to 13 in. w.c.`, `14 to 20 in. w.c.`], r: `combustion testing` },
  { q: `What is Goodman's ground check at the furnace?`, a: [`Neutral to a burner reads 10 ohms or less`, `Hot to neutral reads 0 volts`, `The conduit is tight`, `The gas pipe is bonded to neutral`], r: `Electrical, thermostat & controls` },
  { q: `How long must the sediment trap nipple be?`, a: [`At least 3 inches`, `1 inch`, `12 inches`, `Any length`], r: `Gas piping` },
  { q: `Total external static pressure must not exceed what?`, a: [`The maximum on the nameplate, commonly 0.5 in. w.c.`, `2.0 in. w.c. on any furnace`, `The manifold gas pressure`, `There is no limit if temperature rise is in range`], r: `combustion testing` }
];
})();
