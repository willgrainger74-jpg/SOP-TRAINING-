/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — Rheem tank water heaters (sop-waterheaters.js)
   Two modules: gas and electric. Rheem numbers come from Rheem's Use &
   Care / installation manuals. Code references are to the 2021 IPC,
   IRC and IFGC and the NEC; the city's adopted edition and amendments
   govern, and Utah's statewide amendments are called out where they apply.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
const S = window.SOP.S, M = window.SOP.modules;
const END_CHECK = [`Job site cleaned, old heater hauled away`, `Before and after photos taken`, `Customer shown operation and shutoffs`];

const remove = fuel => ({ t: `Shut down, drain & remove`, why: `${fuel === 'gas' ? 'Gas' : 'Power'} is off and proven off, and the tank is empty, before it moves.`, steps: [
  fuel === 'gas' ? `Turn the gas control to off and close the gas shutoff.` : `Turn off the breaker and verify zero volts at the heater's junction box with a meter. Lock or tag the breaker.`,
  `Close the cold water supply. Open a hot faucet in the house to break the vacuum.`,
  `Connect a hose to the drain valve and run it to a floor drain or outdoors, away from plants and walkways. The water is hot.`,
  `Drain the tank fully. If the drain valve is clogged with sediment, call your manager before you try anything that could flood the home.`,
  fuel === 'gas' ? `Disconnect the water lines, the gas line and the vent. Cap the gas line.` : `Disconnect the water lines and the wiring. Cap the conductors and leave the breaker off.`,
  `Remove the old heater with a dolly and floor protection. Do not drag it across finished floors.`,
  `Inspect the floor, the pan, the shutoff valve and the piping${fuel === 'gas' ? ', and the vent and chimney' : ''}. Replace a cold shutoff valve that does not close fully.`,
  `Check the house water pressure with a gauge. Above 80 PSI the home needs a pressure-reducing valve: tell your manager and the customer.`,
  `Find out whether the home is a closed system: a pressure-reducing valve, check valve or backflow device on the supply. A closed system needs an expansion tank.`
] });

const water = { t: `Water connections & expansion tank`, why: `Leaks, torch heat on the fittings and thermal expansion are the three ways the water side fails.`, steps: [
  `Cold goes to the COLD inlet, hot to the HOT outlet. Both are 3/4-inch NPT; check the markings on the tank.`,
  `Install a shutoff valve on the cold line near the heater.`,
  `Use unions or new flexible connectors on both connections so the heater can be serviced. Do not reuse old flex lines.`,
  `Never put torch heat on the tank's hot and cold connections. Sweat the adapter onto the tubing first, then thread it into the heater. Heat ruins the dip tube and the heat traps.`,
  `Use dielectric fittings where copper meets steel.`,
  `A closed system gets a thermal expansion tank in the cold line between the heater and the check valve or pressure-reducing valve. Rheem is clear that swapping the relief valve does not fix thermal expansion.`,
  `Set the expansion tank's air charge to the house water pressure before connecting it, and support the tank so its weight is not hanging on the pipe.`,
  `Insulate the piping where code or the job calls for it.`
] };

const tp = { t: `Temperature & pressure relief valve`, why: `This is the safety device. It is unobstructed, and its discharge pipe ends where it can be seen and cannot scald anyone.`, steps: [
  `Use the relief valve that comes on the Rheem heater. A replacement must be rated no higher than 150 PSI and its BTU rating must be at least the heater's input. Never reuse an old valve and never plug the opening.`,
  `Nothing goes between the relief valve and the tank: no valve, no reducer, no fitting.`,
  `Keep at least 1.5 inches between the relief valve and any wall or object so it can be tested and replaced.`,
  `Run the discharge pipe the same size as the valve outlet, full length, in a pipe material approved for hot water distribution. No PVC.`,
  `The discharge pipe slopes down the whole way so it drains by gravity, with no valve, cap, tee, trap or reducer anywhere in it.`,
  `End it through an air gap in the same room, pointing down, not more than 6 inches and not less than two pipe diameters above the floor, the pan or the floor drain, where it can be seen.`,
  `No threads on the end of the discharge pipe.`,
  `It serves this relief valve only, is never tied directly into a drain line, and is protected from freezing.`,
  `Utah: no more than 180 degrees of total direction change in the discharge pipe.`
], stop: `A water heater is never left in service with a missing, plugged or capped relief valve.` };

const tell = fuel => ({ t: `Tell the homeowner`, why: `Rheem's manual gives the owner maintenance to do. They only know if we tell them.`, steps: [
  `Show them the ${fuel === 'gas' ? 'gas shutoff, ' : 'breaker, '}the cold water shutoff and the temperature setting, and what the setting means for scalding.`,
  `Relief valve: lift and release the lever at least once a year. If it drips or discharges, call us; never plug it.`,
  `Sediment: drain a few quarts from the drain valve every month in hard water.`,
  `Anode rod: inspected every year and replaced when more than 6 inches of core wire shows. Offer to put it on our maintenance schedule.`,
  fuel === 'gas' ? `Keep the area around the heater clear: nothing combustible, no gasoline or solvents, and nothing blocking the air openings at the base or in the room.` : `If the heater ever stops heating, the high-limit (ECO) may have tripped. That is a service call, not a button for the homeowner to push.`,
  `If the house sits empty for two weeks or more, run a hot faucet for several minutes before using the dishwasher or washer, with no flame or smoking nearby.`,
  `Leave the Use & Care manual with the homeowner and register the warranty the way the office tells you to.`
] });

const COMMON_Q = [
  { q: `Where does the relief valve discharge pipe end?`, a: [`Through an air gap, not more than 6 inches and not less than two pipe diameters above the floor, pan or drain`, `Threaded into the drain line`, `At a capped stub so it cannot drip`, `Anywhere below the valve`], r: `Temperature & pressure relief valve` },
  { q: `Which of these is allowed in the relief valve discharge pipe?`, a: [`None of them`, `A shutoff valve for service`, `A reducer to 1/2 inch`, `A threaded end with a cap`], r: `Temperature & pressure relief valve` },
  { q: `What may be installed between the relief valve and the tank?`, a: [`Nothing`, `A ball valve`, `A reducer bushing`, `A union and nipple`], r: `Temperature & pressure relief valve` },
  { q: `What is the highest pressure rating allowed on the relief valve?`, a: [`150 PSI`, `75 PSI`, `200 PSI`, `300 PSI`], r: `Temperature & pressure relief valve` },
  { q: `What pipe can the discharge line NOT be made of?`, a: [`PVC`, `Copper`, `CPVC rated for hot water`, `Any material approved for hot water distribution`], r: `Temperature & pressure relief valve` },
  { q: `When is a thermal expansion tank required?`, a: [`On a closed system: a pressure-reducing valve, check valve or backflow device on the supply`, `Only on tanks over 75 gallons`, `Only when the relief valve drips`, `Never on city water`], r: `Water connections & expansion tank` },
  { q: `The relief valve on the old heater dripped every afternoon on a closed system. What fixes it?`, a: [`An expansion tank. Rheem says replacing the relief valve does not fix thermal expansion`, `A new relief valve`, `A higher-rated relief valve`, `Capping the discharge pipe`], r: `Water connections & expansion tank` },
  { q: `What is the expansion tank's air charge set to?`, a: [`The house water pressure, before it is connected`, `Always 12 PSI`, `150 PSI`, `Zero`], r: `Water connections & expansion tank` },
  { q: `How are sweat connections made at the heater?`, a: [`Sweat the adapter onto the tubing first, then thread it in. No torch heat on the tank connections`, `Solder directly at the tank nipple`, `Heat the nipple first so the solder flows`, `With a wet rag on the tank`], r: `Water connections & expansion tank` },
  { q: `House pressure reads 105 PSI. What does the SOP say?`, a: [`Above 80 PSI the home needs a pressure-reducing valve: tell your manager and the customer`, `Set the expansion tank to 105 and move on`, `Install a bigger relief valve`, `Nothing, 150 PSI is the limit`], r: `Shut down, drain & remove` },
  { q: `Where do Utah's seismic straps go?`, a: [`Within the upper one-third and the lower one-third of the heater`, `One strap around the middle`, `Two straps at the very top`, `Only on heaters over 50 gallons`], r: `Code requirements` },
  { q: `When is a drain pan required?`, a: [`Wherever a leak would damage the building`, `Only in attics`, `Only on electric heaters`, `Never on a slab`], r: `Code requirements` },
  { q: `What does Rheem tell the owner to do with the relief valve?`, a: [`Lift and release the lever at least once a year`, `Never touch it`, `Replace it every month`, `Cap it when leaving on vacation`], r: `Tell the homeowner` }
];

/* ── RHEEM GAS ──────────────────────────────────────────────────── */
M.push({ id: `whgas`, trade: `plumbing`, art: `waterheater`, title: `Rheem Gas Water Heater Install`, short: `Rheem Gas WH`,
  desc: `Rheem atmospheric gas tank water heater: removal, clearances, water, relief valve, gas line, venting, combustion air, startup and the code requirements an inspector checks.`,
  expect: [`We install Rheem. Read the Use & Care manual in the box and the labels on the heater: they win over this SOP where they differ.`, `The burner is never lit until the tank is completely full of water.`, `The relief valve and its discharge pipe are installed to code on every job, and the draft hood is tested for spillage on every job.`],
  sections: [ S.arrive, remove('gas'),
    { t: `Set the new Rheem gas water heater`, why: `Location and clearances are the first things an inspector looks at.`, steps: [
      `Confirm the heater matches the job: gallons, height and diameter, natural gas or LP, and vent size. A Rheem heater is never converted from one gas to the other.`,
      `Check the altitude label on the heater. It may not be installed above the altitude on the label.`,
      `Set it level, as close to the vent as practical, indoors and protected from freezing. Never in a bathroom, a bedroom, or a closet that opens into one.`,
      `Rheem's clearances to combustibles in a closet: 3 inches in front, 1 inch on the sides, 0 at the rear and 12 inches on top. The label on the heater governs.`,
      `Leave 24 inches clear at the front and top for service.`,
      `Do not set it directly on carpet. On carpet it sits on a metal or wood panel that extends at least 5 inches past the heater all around.`,
      `Where a leak would cause damage, set it in a metal drain pan at least 2 inches wider than the heater, piped to a drain. The pan must not block the combustion air openings at the base. No plastic pan under a gas heater.`,
      `Garage: a Rheem FVIR heater may sit on the floor unless the local code or inspector requires an 18-inch stand. Either way, protect it from vehicles.`,
      `Strap it where code requires: one strap in the upper third and one in the lower third.`
    ] },
    water, tp,
    { t: `Gas line`, why: S.gas.why, steps: [
      `Confirm the gas type on the rating plate matches the house.`,
      `Install a manual shutoff valve in the same room, within 6 feet of the heater. A lever-type valve has a T-handle.`,
      `Install a sediment trap downstream of the shutoff, as close to the gas control inlet as practical: a tee with a capped nipple at the bottom.`,
      `Connect with a ground-joint union, or a new listed flexible connector no longer than 36 inches. Never reuse the old connector.`,
      `Use pipe compound rated for LP gas, sparingly, on male threads only.`,
      `Do not over-tighten into the gas control: Rheem's limit is 31.5 foot-pounds. Hold the control with a backup wrench.`,
      `Inlet pressure may never exceed 14 in. w.c. The minimum inlet and the manifold pressure are on the rating plate.`,
      `Turn the gas on and check every joint with soapy water at normal operating pressure. Never use a flame. Check the factory connections at the gas control again once the burner is lit.`,
      `For a pressure test of the piping above 1/2 PSI, disconnect the heater and its shutoff from the line.`
    ], stop: S.gas.stop },
    { t: `Venting & combustion air`, why: `A natural-draft water heater vents by buoyancy alone. Small mistakes spill flue gas into the home.`, steps: [
      `Confirm the flue baffle is hanging in the top of the flue, then set the factory draft hood on its legs. Never modify or leave off the draft hood, and never insulate over the top of the heater.`,
      `The vent connector is the same diameter as the draft hood outlet, or larger. Never smaller.`,
      `Pitch the connector upward toward the vent or chimney at least 1/4 inch per foot, and fasten each joint with sheet-metal screws.`,
      `Keep single-wall connector at least 6 inches from combustibles, and Type B vent at its listed clearance, normally 1 inch.`,
      `Size the vent from the National Fuel Gas Code tables. If the vent used to carry a furnace as well and now carries only the water heater, it has to be checked and resized.`,
      `Confirm the vent or chimney is sound, lined and capped.`,
      `Combustion air for a confined space (under 50 cubic feet per 1,000 BTU/h): two openings, one within 12 inches of the ceiling and one within 12 inches of the floor.`,
      `Each opening: 1 square inch per 1,000 BTU/h and at least 100 square inches for indoor air; 1 per 4,000 for direct or vertical outdoor openings; 1 per 2,000 for horizontal ducts.`,
      `Keep 1 inch clear around the air inlet openings at the base of the heater.`
    ] },
    { t: `Fill, light & test`, why: `Fill first. Then light. Then prove it drafts and holds.`, steps: [
      `Close the drain valve and open the cold supply.`,
      `Open each hot faucet slowly to push the air out. A steady stream with no air means the tank is full.`,
      `Check every water joint for leaks at full pressure.`,
      `Light the heater by the instructions on its label and watch the burner through the sight glass.`,
      `After 5 minutes of main burner operation, with the doors closed and the exhaust fans and dryer running, test for spillage at the draft hood relief opening with smoke or a match. It must draw in all the way around.`,
      `Set the temperature to 120 degrees F, the mark Rheem recommends as the starting point, and tell the customer. Above 125 degrees water scalds fast.`,
      `Recheck the water and gas joints once the tank is hot.`,
      `Confirm the home has a working CO alarm and tell the customer if it does not.`
    ], stop: `A heater that spills flue gas at the draft hood is shut off and not left in service. Call your manager.` },
    { t: `Code requirements: gas water heater`, why: `These are the items the inspector checks. Section numbers are from the 2021 IPC, IRC and IFGC. The city's adopted code and amendments govern, so ask when you are not sure.`, steps: [
      `Permit: a water heater replacement needs a permit and an inspection in most of our cities. The office pulls it; you make sure the job passes.`,
      `Location (IFGC 303.3): not in a bedroom, bathroom or a closet opening into one, unless it is a direct-vent heater or in a sealed closet built for it.`,
      `Garage (IFGC 305.3): the ignition source is 18 inches above the floor unless the heater is listed as flammable-vapor-ignition resistant (FVIR). A heater where a vehicle can hit it is protected from impact.`,
      `Combustion air (IFGC 304) and venting (IFGC 503 and 504): sized and installed as in the venting section of this SOP.`,
      `Gas piping: a sediment trap at the appliance (IFGC 408.4) and a shutoff valve in the same room within 6 feet (IFGC 409.5).`,
      `Relief valve discharge (IPC 504.6, IRC P2804.6.1): full size, gravity drained, air gap in the same room, ending 6 inches or less above the floor or receptor, no valve, no tee, no threads, no trap, approved material.`,
      `Drain pan (IPC 504.7, IRC P2801.6): required where a leak would cause damage; at least 1.5 inches deep with a 3/4-inch drain; not plastic under a gas heater. A replacement where no pan drain existed does not have to add one. Utah: the pan takes water from the water heater only.`,
      `Seismic strapping: Utah requires every water heater to be strapped within the upper one-third and the lower one-third (IRC P2801.8 as amended by Utah). In Arizona, strap where the city requires it.`,
      `Thermal expansion (IPC 607.3): a closed system needs an expansion tank or other approved device. The relief valve is not expansion control.`,
      `Water pressure (IPC 604.8): above 80 PSI requires a pressure-reducing valve.`,
      `A cold water shutoff valve at the heater (IPC 503.1), and the heater installed to its listing and the manufacturer's instructions.`
    ] },
    tell('gas'), S.closeout ],
  checklist: [`Gas off and verified before removal`, `House water pressure checked (80 PSI or less)`, `Gas type and altitude label match the job`, `Clearances met, 24 inches service space`, `Not on carpet; metal pan where required, base air openings clear`, `Strapped upper and lower third where required`, `Cold shutoff valve installed`, `No torch heat on tank connections`, `Expansion tank on closed system, charged to house pressure, supported`, `Relief valve unobstructed, 1.5 inches clear`, `Discharge pipe full size, gravity drained, no valve or threads, ends within 6 inches of floor through an air gap`, `Shutoff, sediment trap and new connector (36 inches or less) installed`, `Every gas joint leak-tested`, `Flue baffle in place, draft hood installed`, `Vent connector pitched up 1/4 inch per foot, screwed, clearances met`, `Combustion air openings sized and clear`, `Tank full and air purged before lighting`, `Spillage test passed after 5 minutes`, `Temperature set to 120 degrees F`, `No water or gas leaks with the tank hot`, `CO alarm confirmed`, `Permit posted or inspection scheduled`, ...END_CHECK],
  record: [`Job address and date`, `Rheem model and serial number`, `Gallons and gas type`, `House water pressure (PSI)`, `Expansion tank air charge (PSI)`, `Vent size and type`, `Spillage test result`, `Temperature setting`, `Permit number`, `Lead installer and helper names`],
  quiz: [...COMMON_Q,
    { q: `When may the burner be lit?`, a: [`Only after the tank is completely full and the air is purged`, `As soon as the gas is connected`, `While the tank is filling`, `Before filling, to test the pilot`], r: `Fill, light & test` },
    { q: `How and when is the draft hood tested?`, a: [`After 5 minutes of main burner operation, doors closed and fans running, with smoke or a match at the relief opening`, `At light-off with the door open`, `By feeling the vent pipe`, `It is not tested on a new heater`], r: `Fill, light & test` },
    { q: `The heater spills flue gas at the draft hood. What do you do?`, a: [`Shut it off, do not leave it in service, and call your manager`, `Open a window and leave it running`, `Tape around the draft hood`, `Turn the temperature down`], r: `Fill, light & test` },
    { q: `How is the vent connector run?`, a: [`Pitched up toward the vent at least 1/4 inch per foot, joints screwed`, `Level, joints taped`, `Pitched down toward the vent`, `Any way, the draft hood handles it`], r: `Venting & combustion air` },
    { q: `How close can single-wall vent connector be to combustibles?`, a: [`6 inches`, `1 inch`, `Touching, if it is screwed tight`, `3 inches`], r: `Venting & combustion air` },
    { q: `The furnace was removed from the shared vent and only the water heater is left. What is required?`, a: [`The vent is checked against the tables and resized`, `Nothing, a bigger vent drafts better`, `A second draft hood`, `A longer connector`], r: `Venting & combustion air` },
    { q: `What is the longest flexible gas connector Rheem allows?`, a: [`36 inches, and it is new`, `72 inches`, `Any length, if it is not kinked`, `The old one can be reused`], r: `Gas line` },
    { q: `What is the maximum inlet gas pressure?`, a: [`14 in. w.c.`, `3.5 in. w.c.`, `2 PSI`, `5 PSI`], r: `Gas line` },
    { q: `Where does the sediment trap go?`, a: [`Downstream of the shutoff, as close to the gas control inlet as practical`, `At the meter`, `Upstream of the shutoff`, `On the vent`], r: `Gas line` },
    { q: `The heater is going on carpet. What is required?`, a: [`A metal or wood panel extending at least 5 inches past the heater all around`, `Nothing`, `A plastic pan`, `Cutting the carpet flush to the heater`], r: `Set the new Rheem gas water heater` },
    { q: `What kind of drain pan goes under a gas water heater?`, a: [`Metal, and it must not block the air openings at the base`, `Plastic`, `Any pan`, `None is ever allowed`], r: `Set the new Rheem gas water heater` },
    { q: `Can a Rheem FVIR gas heater sit on a garage floor?`, a: [`Yes, unless the local code or inspector requires an 18-inch stand; protect it from vehicles`, `Never`, `Only on LP`, `Only if it is strapped twice`], r: `Set the new Rheem gas water heater` },
    { q: `Where may a gas water heater NOT be installed?`, a: [`A bathroom, a bedroom, or a closet opening into one`, `A garage`, `A utility room`, `A basement`], r: `Code requirements` },
    { q: `What temperature does Rheem recommend as the starting setting?`, a: [`120 degrees F`, `140 degrees F`, `160 degrees F`, `As high as it goes`], r: `Fill, light & test` }
  ] });

/* ── RHEEM ELECTRIC ─────────────────────────────────────────────── */
M.push({ id: `whelectric`, trade: `plumbing`, art: `whelectric`, title: `Rheem Electric Water Heater Install`, short: `Rheem Electric WH`,
  desc: `Rheem electric tank water heater: removal, location, water, relief valve, branch circuit and wiring, fill before power, and the code requirements an inspector checks.`,
  expect: [`We install Rheem. Read the Use & Care manual in the box and the rating plate: they win over this SOP where they differ.`, `Power is never turned on until the tank is completely full of water. A dry element burns out in seconds and it is not covered by warranty.`, `The breaker is off, verified with a meter and locked or tagged any time the junction box is open.`],
  sections: [ S.arrive, remove('electric'),
    { t: `Set the new Rheem electric water heater`, why: `It has to be reachable for service and it cannot damage the home when it eventually leaks.`, steps: [
      `Confirm the heater matches the job: gallons, height and diameter, voltage and element wattage on the rating plate.`,
      `Set it level, indoors, in a clean dry spot protected from freezing, on a floor that can carry it full of water.`,
      `Do not install it in an attic that can get hotter than 150 degrees F.`,
      `Leave room to take off the upper and lower access panels and to pull the elements.`,
      `Where a leak would cause damage, set it in a drain pan at least 2 inches wider than the heater, with a drain line of at least 3/4 inch pitched to a drain.`,
      `Garage: ask the inspector whether your city wants an electric heater raised 18 inches, and protect it from vehicles.`,
      `Strap it where code requires: one strap in the upper third and one in the lower third.`
    ] },
    water, tp,
    { t: `Branch circuit & wiring`, why: `The circuit is sized to the rating plate. An undersized wire overheats; an oversized breaker does not protect it.`, steps: [
      `Verify the breaker is off with a meter at the junction box before you touch a wire.`,
      `The heater needs its own branch circuit. Confirm the supply voltage matches the rating plate.`,
      `Rheem's sizing at 240 volts with copper wire: 4,500 watts takes a 25-amp breaker on 10-gauge; 5,500 watts takes a 30-amp breaker on 10-gauge. Always check the rating plate.`,
      `If the existing breaker or wire does not match, stop. The circuit has to be corrected by a qualified electrician before the heater is powered.`,
      `Connect in the junction box at the top of the heater: the two hot conductors to the heater leads with proper connectors, copper only, through a cable clamp.`,
      `Bond the ground to the heater's ground screw. The water piping is not a ground.`,
      `Provide a disconnect within sight of the heater, or a breaker that can be locked off, as code requires.`,
      `Put the junction box cover back on, and check the access panels and insulation are in place.`,
      `Leave the breaker off until the tank is full.`
    ], stop: `Wrong voltage, wrong breaker or wrong wire size: do not power the heater. Call your manager.` },
    { t: `Fill, power up & test`, why: `Fill first. Then power. Then prove it heats.`, steps: [
      `Close the drain valve and open the cold supply.`,
      `Open each hot faucet slowly to push the air out. A steady stream with no air means the tank is full.`,
      `Check every water joint for leaks at full pressure.`,
      `Only now turn on the breaker.`,
      `Measure voltage at the heater and amp draw on the element that is heating. Compare to the rating plate.`,
      `Set the temperature to 120 degrees F and tell the customer. Above 125 degrees water scalds fast.`,
      `If the heater does not heat, do not just push the red high-limit (ECO) reset. Find out why it tripped first.`,
      `Recheck the water joints once the tank is hot.`
    ], stop: `Power is never turned on to an electric water heater until water runs air-free from a hot faucet.` },
    { t: `Code requirements: electric water heater`, why: `These are the items the inspector checks. Section numbers are from the 2021 IPC and IRC and the National Electrical Code. The city's adopted code and amendments govern, so ask when you are not sure.`, steps: [
      `Permit: a water heater replacement needs a permit and an inspection in most of our cities. The office pulls it; you make sure the job passes.`,
      `Branch circuit (NEC 422.13): a storage water heater of 120 gallons or less is a continuous load, so the wire and breaker are rated at least 125 percent of the nameplate amps. A 4,500-watt, 240-volt heater draws 18.75 amps, which needs at least 23.4 amps of circuit.`,
      `Disconnect (NEC 422.31(B)): a switch or breaker within sight of the heater, or a breaker that can be locked in the off position.`,
      `Grounding (NEC Article 250): an equipment ground to the heater. Where metal water piping was cut, restore the bonding jumper between hot, cold and the grounding system the way the inspector requires.`,
      `Relief valve discharge (IPC 504.6, IRC P2804.6.1): full size, gravity drained, air gap in the same room, ending 6 inches or less above the floor or receptor, no valve, no tee, no threads, no trap, approved material.`,
      `Drain pan (IPC 504.7, IRC P2801.6): required where a leak would cause damage; at least 1.5 inches deep with a 3/4-inch drain. A replacement where no pan drain existed does not have to add one. Utah: the pan takes water from the water heater only.`,
      `Seismic strapping: Utah requires every water heater to be strapped within the upper one-third and the lower one-third (IRC P2801.8 as amended by Utah). In Arizona, strap where the city requires it.`,
      `Thermal expansion (IPC 607.3): a closed system needs an expansion tank or other approved device. The relief valve is not expansion control.`,
      `Water pressure (IPC 604.8): above 80 PSI requires a pressure-reducing valve.`,
      `A cold water shutoff valve at the heater (IPC 503.1), and the heater installed to its listing and the manufacturer's instructions.`
    ] },
    tell('electric'), S.closeout ],
  checklist: [`Breaker off, verified and tagged before removal`, `House water pressure checked (80 PSI or less)`, `Voltage and wattage match the job`, `Access to panels and elements`, `Drain pan with 3/4-inch drain where required`, `Strapped upper and lower third where required`, `Cold shutoff valve installed`, `No torch heat on tank connections`, `Expansion tank on closed system, charged to house pressure, supported`, `Relief valve unobstructed`, `Discharge pipe full size, gravity drained, no valve or threads, ends within 6 inches of floor through an air gap`, `Dedicated circuit; breaker and wire match the rating plate`, `Copper conductors, cable clamp, ground bonded`, `Disconnect within sight or lockable breaker`, `Junction box cover and access panels on`, `Tank full and air purged before power`, `Voltage and element amps verified`, `Temperature set to 120 degrees F`, `No leaks with the tank hot`, `Permit posted or inspection scheduled`, ...END_CHECK],
  record: [`Job address and date`, `Rheem model and serial number`, `Gallons, voltage and wattage`, `Breaker size and wire gauge`, `House water pressure (PSI)`, `Expansion tank air charge (PSI)`, `Voltage and element amps measured`, `Temperature setting`, `Permit number`, `Lead installer and helper names`],
  quiz: [...COMMON_Q,
    { q: `When may the breaker be turned on?`, a: [`Only after the tank is full and water runs air-free from a hot faucet`, `As soon as the wires are connected`, `While the tank is filling, to save time`, `Before filling, to test the elements`], r: `Fill, power up & test` },
    { q: `What happens to an element that is powered dry?`, a: [`It burns out in seconds, and it is not covered by warranty`, `Nothing`, `It heats the tank faster`, `The thermostat protects it`], r: `Fill, power up & test` },
    { q: `What does Rheem's table call for on a 4,500-watt, 240-volt heater with copper wire?`, a: [`A 25-amp breaker on 10-gauge`, `A 20-amp breaker on 12-gauge`, `A 15-amp breaker on 14-gauge`, `A 50-amp breaker on 6-gauge`], r: `Branch circuit & wiring` },
    { q: `What does Rheem's table call for on a 5,500-watt, 240-volt heater?`, a: [`A 30-amp breaker on 10-gauge`, `A 20-amp breaker on 12-gauge`, `A 25-amp breaker on 14-gauge`, `A 60-amp breaker on 4-gauge`], r: `Branch circuit & wiring` },
    { q: `The existing circuit is a 20-amp breaker on 12-gauge wire and the new heater is 4,500 watts. What do you do?`, a: [`Stop. The circuit is corrected by a qualified electrician before the heater is powered`, `Connect it, the old heater ran fine`, `Swap in a 30-amp breaker on the same wire`, `Disconnect the lower element`], r: `Branch circuit & wiring` },
    { q: `Why is the circuit sized at 125 percent of the nameplate amps?`, a: [`A storage water heater of 120 gallons or less is treated as a continuous load`, `To allow for a bigger heater later`, `Because elements draw double at startup`, `It is not; 100 percent is the rule`], r: `Code requirements` },
    { q: `What does code require for a disconnect?`, a: [`Within sight of the heater, or a breaker that can be locked off`, `Nothing`, `A cord and plug`, `A GFCI receptacle`], r: `Code requirements` },
    { q: `What do you do before touching a wire in the junction box?`, a: [`Verify the breaker is off with a meter`, `Ask the customer if it is off`, `Wear gloves`, `Close the cold water valve`], r: `Branch circuit & wiring` },
    { q: `How is the heater grounded?`, a: [`An equipment ground bonded to the heater's ground screw; the water piping is not a ground`, `Through the copper water lines`, `It does not need a ground at 240 volts`, `To the neutral`], r: `Branch circuit & wiring` },
    { q: `Which conductors may be used at the junction box?`, a: [`Copper only`, `Aluminum only`, `Either`, `Lamp cord`], r: `Branch circuit & wiring` },
    { q: `The new heater will not heat. What about the red ECO reset?`, a: [`Find out why the high limit tripped before resetting it`, `Push it until it stays in`, `Jumper across it`, `Remove it`], r: `Fill, power up & test` },
    { q: `Where should a Rheem electric heater NOT be installed?`, a: [`An attic that can exceed 150 degrees F`, `A garage`, `A utility closet`, `A basement`], r: `Set the new Rheem electric water heater` },
    { q: `What size is the pan drain line?`, a: [`At least 3/4 inch, pitched to a drain`, `1/4-inch tubing`, `No drain is needed with a pan`, `2 inch`], r: `Set the new Rheem electric water heater` },
    { q: `What do you measure after power-up?`, a: [`Voltage at the heater and amp draw on the heating element`, `Only the water temperature after an hour`, `Nothing`, `Gas pressure`], r: `Fill, power up & test` }
  ] });
})();
